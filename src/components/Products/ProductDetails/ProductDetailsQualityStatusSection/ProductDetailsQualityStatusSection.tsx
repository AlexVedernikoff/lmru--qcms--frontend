import {BackofficeStatus, Grid, Typography, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import CustomTable from '../../../Common/CustomTable';
import styles from '../../../Common.module.css';

import productDetailsStyles from './productDetailsQualityStatuses.module.css';

import {useCallback, useEffect, useMemo, useState} from 'react';

import {useGetDetailsForProductsQuery, usePostUpdateProductMutation} from '../productDetailsApi';

import {IDataDeatailsQstatus, IUpdateBodyReq} from '../../../../common/types/productDetails';
import {prepareUpdateBody} from '../ProductDetailsMapping/ProductDetailsQualityStatusSection/prepareUpdateBody';
import {
    DataIndexQtable,
    prepareQstatusesColumns,
} from '../ProductDetailsMapping/ProductDetailsQualityStatusSection/prepareQualityStatusesColumns';
import {
    getQualityStatus,
    qaulityStatusSectionMapping,
} from '../ProductDetailsMapping/ProductDetailsQualityStatusSection/qaulityStatusSectionMapping';
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

    const {data: details} = useGetDetailsForProductsQuery({productId});

    const [tableData, setTableData] = useState<IDataDeatailsQstatus[]>([]);

    const [notificationApi, notificationContext] = notification.useNotification();

    const makeMapping = useCallback(() => {
        if (details?.qualityStatuses && details?.qualityStatuses?.length > 0) {
            const arrQRowsVal: IDataDeatailsQstatus[] = details.qualityStatuses.map((el, i: number) => {
                const mapping = qaulityStatusSectionMapping(t, i, el);
                return mapping;
            });

            setTableData(arrQRowsVal);
        }
    }, [details?.qualityStatuses, t]);

    useEffect(() => {
        makeMapping();
    }, [makeMapping]);

    const isChangesInData = useMemo(
        () =>
            tableData.some(
                row =>
                    row.isStatusChanged ||
                    row.isBlockOredersChanged ||
                    row.isBlockSellingsChanged ||
                    row.isBlockPublicsChanged
            ),
        [tableData]
    );

    const handleChange = (recordId: string, value: string, selectedValue?: string | null) => {
        setTableData(prevState =>
            prevState.map(el => {
                if (el.id === recordId) {
                    switch (value) {
                        case DataIndexQtable.Statuses:
                            if (selectedValue) {
                                if (selectedValue !== el.initialStatusEng && selectedValue !== el.initialStatusRu) {
                                    return {
                                        ...el,
                                        ruStatus: selectedValue,
                                        engStatus: getQualityStatus(ELanguages.ENG, selectedValue),
                                        isStatusCommentOpened: true,
                                        isValidStatus: false,
                                        statusComment: '',
                                        isStatusChanged: true,
                                    };
                                } else {
                                    return {
                                        ...el,
                                        ruStatus: el.initialStatusRu,
                                        engStatus: el.initialStatusEng,
                                        isStatusCommentOpened: false,
                                        isValidStatus: true,
                                        statusComment: '',
                                        isStatusChanged: false,
                                    };
                                }
                            }
                            break;
                        case DataIndexQtable.BlockOrders:
                            if (!el.blockOrders !== el.initialBlockOrders) {
                                return {
                                    ...el,
                                    blockOrders: !el.blockOrders,
                                    isBlockOrderOpened: true,
                                    isValidBlockOrders: false,
                                    blockOrdersComment: '',
                                    isBlockOredersChanged: true,
                                };
                            } else {
                                return {
                                    ...el,
                                    blockOrders: el.initialBlockOrders,
                                    isBlockOrderOpened: false,
                                    isValidBlockOrders: true,
                                    blockOrdersComment: '',
                                    isBlockOredersChanged: false,
                                };
                            }

                        case DataIndexQtable.BlockSellings:
                            if (!el.blockSellings !== el.initialBlockSellings) {
                                return {
                                    ...el,
                                    blockSellings: !el.blockSellings,
                                    isBlockSellingsOpened: true,
                                    isValidBlockSellings: false,
                                    blockSellingsComment: '',
                                    isBlockSellingsChanged: true,
                                };
                            } else {
                                return {
                                    ...el,
                                    blockSellings: el.initialBlockSellings,
                                    isBlockSellingsOpened: false,
                                    isValidBlockSellings: true,
                                    blockSellingsComment: '',
                                    isBlockSellingsChanged: false,
                                };
                            }

                        case DataIndexQtable.BlockPublics:
                            if (!el.blockPublics !== el.initialBlockPublics) {
                                return {
                                    ...el,
                                    blockPublics: !el.blockPublics,
                                    isBlockPublicsOpened: true,
                                    isValidBlockPublics: false,
                                    blockPublicsComment: '',
                                    isBlockPublicsChanged: true,
                                };
                            } else {
                                return {
                                    ...el,
                                    blockPublics: !el.blockPublics,
                                    isBlockPublicsOpened: false,
                                    isValidBlockPublics: true,
                                    blockPublicsComment: '',
                                    isBlockPublicsChanged: false,
                                };
                            }

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
                notificationApi.open({
                    message: 'Продукт успешно обновлен',
                });
            } catch (error) {
                notificationApi.open({
                    message: 'Ошибка при обновлении продукта',
                });
                discardChanges();
            }
        }
    };

    const discardChanges = () => {
        makeMapping();
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
