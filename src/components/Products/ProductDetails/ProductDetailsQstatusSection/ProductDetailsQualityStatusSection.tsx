import {BackofficeStatus, Grid, Typography, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import CustomTable from '../../../Common/CustomTable';
import styles from '../../../Common.module.css';

import productDetailsStyles from './productDetailsQstatuses.module.css';

import {useEffect, useState} from 'react';

import {useGetDetailsForProductsQuery, usePostUpdateProductMutation} from '../productDetailsApi';

import {IDataDeatailsQstatus, IUpdateBodyReq, ProductDetails} from '../../../../common/types/productDetails';
import {prepareUpdateBody} from '../ProductDetailsMapping/ProductDetailsQaulityStatusSection/prepareUpdateBody';
import {
    DataIndexQtable,
    prepareQstatusesColumns,
} from '../ProductDetailsMapping/ProductDetailsQaulityStatusSection/prepareQstatusesColumns';
import {
    getQualityStatus,
    qaulityStatusSectionMapping,
} from '../ProductDetailsMapping/ProductDetailsQaulityStatusSection/qaulityStatusSectionMapping';
import {useParams} from 'react-router-dom';
import {notification} from 'antd';

export enum ELanguages {
    RU = 'ru',
    ENG = 'eng',
}

const ProductDetailsQualityStatusSection: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();

    const [postUpdateProduct] = usePostUpdateProductMutation();

    const {data} = useGetDetailsForProductsQuery({productId});

    const [details, setDetails] = useState<ProductDetails>();
    const [tableData, setTableData] = useState<IDataDeatailsQstatus[]>([]);
    const [isChangesInData, setIsChangesInData] = useState(false);
    const [isDiscardChanges, setIsDiscardChanges] = useState(false);

    const [notificationApi, notificationContext] = notification.useNotification();

    useEffect(() => {
        setIsDiscardChanges(false);
        data && setDetails(data);
    }, [data, isDiscardChanges]);

    useEffect(() => {
        if (details?.qualityStatuses && details?.qualityStatuses?.length > 0) {
            const arrQRowsVal: IDataDeatailsQstatus[] = details.qualityStatuses.map((el, i: number) => {
                const mapping = qaulityStatusSectionMapping(t, i, el);
                return mapping;
            });

            setTableData(arrQRowsVal);
        }
    }, [details?.qualityStatuses, t]);

    const handleChange = (recordId: string, value: string, selectedValue?: string | null) => {
        setIsChangesInData(true);

        setTableData(prevState =>
            prevState.map(el => {
                if (el.id === recordId) {
                    switch (value) {
                        case DataIndexQtable.Statuses:
                            if (selectedValue) {
                                return {
                                    ...el,
                                    ruStatus: selectedValue,
                                    engStatus: getQualityStatus(ELanguages.ENG, selectedValue),
                                    isStatusCommentOpened: true,
                                    isValidStatus: false,
                                };
                            }
                            break;
                        case DataIndexQtable.BlockOrders:
                            return {
                                ...el,
                                blockOrders: !el.blockOrders,
                                isBlockOrderOpened: true,
                                isValidBlockOrders: false,
                            };
                        case DataIndexQtable.BlockSellings:
                            return {
                                ...el,
                                blockSellings: !el.blockSellings,
                                isBlockSellingsOpened: true,
                                isValidBlockSellings: false,
                            };
                        case DataIndexQtable.BlockPublics:
                            return {
                                ...el,
                                blockPublics: !el.blockPublics,
                                isBlockPublicsOpened: true,
                                isValidBlockPublics: false,
                            };
                        default:
                            break;
                    }
                }
                return el;
            })
        );
    };

    const handleComments = (recordId: string, comment: string, value: string) => {
        setTableData(prevState =>
            prevState.map(el => {
                if (el.id === recordId) {
                    setIsChangesInData(true);
                    switch (value) {
                        case DataIndexQtable.Statuses:
                            return {
                                ...el,
                                statusComment: comment,
                                isValidStatus: comment ? true : false,
                            };
                        case DataIndexQtable.BlockOrders:
                            return {
                                ...el,
                                blockOrdersComment: comment,
                                isValidBlockOrders: comment ? true : false,
                            };
                        case DataIndexQtable.BlockSellings:
                            return {
                                ...el,
                                blockSellingsComment: comment,
                                isValidBlockSellings: comment ? true : false,
                            };
                        case DataIndexQtable.BlockPublics:
                            return {
                                ...el,
                                blockPublicsComment: comment,
                                isValidBlockPublics: comment ? true : false,
                            };
                        default:
                            break;
                    }
                }
                return el;
            })
        );
    };

    const updateChangesOnServer = async () => {
        const isValidationPassed = tableData.every(
            row => row.isValidStatus && row.isValidBlockOrders && row.isValidBlockPublics && row.isValidBlockSellings
        );

        if (isValidationPassed) {
            const commonProductFields = {
                productId,
                productWithSubstances: details?.productWithSubstances,
                qualityModelId: details?.qualityModelId ? details?.qualityModelId : '',
            };
            const body: IUpdateBodyReq = prepareUpdateBody(tableData, commonProductFields);

            try {
                await postUpdateProduct({body}).unwrap();
            } catch (error) {
                notificationApi.open({
                    message: 'Ошибка при обновлении продукта',
                });
                discardChanges();
            }
            setIsChangesInData(false);
        }
    };

    const discardChanges = () => {
        setDetails(undefined);
        setIsDiscardChanges(true);
        setIsChangesInData(false);
    };

    const handleHistoryTables = (recordId: string, dataIndex: string) => {
        setTableData(prevState =>
            prevState.map(el => {
                if (el.id === recordId) {
                    switch (dataIndex) {
                        case DataIndexQtable.Statuses:
                            return {...el, isStatusHistoryOpened: !el.isStatusHistoryOpened};
                        case DataIndexQtable.BlockOrders:
                            return {...el, isOrdersHistoryOpened: !el.isOrdersHistoryOpened};
                        case DataIndexQtable.BlockSellings:
                            return {...el, isSellingsHistoryOpened: !el.isSellingsHistoryOpened};
                        case DataIndexQtable.BlockPublics:
                            return {...el, isPublicationsHistoryOpened: !el.isPublicationsHistoryOpened};
                        default:
                            break;
                    }
                }
                return el;
            })
        );
    };

    const attr_columns = prepareQstatusesColumns(handleChange, handleComments, handleHistoryTables);

    return (
        <>
            {notificationContext}
            <Grid className={styles.panel} rowGap={16} columnGap={16}>
                <Grid rowGap={16} columnGap={16} columns="1fr">
                    <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
                        <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Title')}</Typography>

                        <Typography variant="m" size="body_long">
                            <BackofficeStatus align="left" text="" variant={'default'} />
                            {t('ProductDetails.QualityStatusSection.Table.Empty')}
                        </Typography>

                        <CustomTable
                            scroll={{y: 400}}
                            columns={attr_columns}
                            dataSource={tableData}
                            tableLayout="fixed"
                            size="small"
                        />
                    </Grid>
                </Grid>

                <Grid columnGap={16} columns="repeat(7, 1fr)" className={productDetailsStyles.buttStyles}>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />

                    <Grid columnGap={16}>
                        <RegularButton
                            disabled={!isChangesInData}
                            onClick={() => discardChanges()}
                            size="m"
                            variant="outline"
                        >
                            {t('Buttons.Clear')}
                        </RegularButton>
                    </Grid>

                    <Grid columnGap={16}>
                        <RegularButton
                            disabled={!isChangesInData}
                            onClick={() => {
                                updateChangesOnServer();
                            }}
                            size="m"
                            variant="primary"
                        >
                            {'Отправить'}
                        </RegularButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductDetailsQualityStatusSection;
