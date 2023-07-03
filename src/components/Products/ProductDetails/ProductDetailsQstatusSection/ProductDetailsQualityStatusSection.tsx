import {BackofficeStatus, Grid, Typography, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import CustomTable from '../../../Common/CustomTable';
import styles from '../../../Common.module.css';

import stylesProductQStatus from './productDetailsQstatuses.module.css';

import {useEffect, useState} from 'react';

import {useGetDetailsForProductsQuery, usePostUpdateProductMutation} from '../productDetailsApi';

import {securityCode} from '../mockProductDetails';

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

export enum EBlockers {
    BlockOrders = 'blockOrders',
    BlockSellings = 'blockSellings',
    BlockPublics = 'blockPublics',
}

export enum ELanguages {
    RU = 'ru',
    ENG = 'eng',
}

const ProductDetailsQualityStatusSection: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();

    const [postUpdateProduct] = usePostUpdateProductMutation();

    const {data} = useGetDetailsForProductsQuery({productId, securityCode});

    const [details, setDetails] = useState<ProductDetails>();
    const [tableData, setTableData] = useState<IDataDeatailsQstatus[]>([]);
    const [isChangesInData, setIsChangesInData] = useState(false);
    const [isDiscardChanges, setIsDiscardChanges] = useState(false);

    useEffect(() => {
        setIsDiscardChanges(false);
        data && setDetails(data);
    }, [data, isDiscardChanges]);

    useEffect(() => {
        if (details?.qualityStatuses && details?.qualityStatuses?.length > 0) {
            const arrQRowsVal: IDataDeatailsQstatus[] = details.qualityStatuses.map((el, i: number) => {
                const mapping = qaulityStatusSectionMapping(t, el);

                return {
                    id: `${i}`,
                    bu: mapping.buCode,
                    buCodeText: mapping.buCodeText,
                    statuses: mapping.arrQstatusesRu,
                    blockOrders: mapping.blockedForOrders,
                    blockOrdersComment: '',
                    isBlockOrderOpened: false,
                    blockSellings: mapping.blockedForSellings,
                    blockSellingsComment: '',
                    isBlockSellingsOpened: false,
                    blockPublics: mapping.blockedForPublics,
                    blockPublicsComment: '',
                    isBlockPublicsOpened: false,
                    ruStatus: mapping.ruStatus,
                    engStatus: mapping.engStatus,
                    isStatusCommentOpened: false,
                    statusComment: '',
                    isStatusHistoryOpened: false,
                    statusRowHistory: mapping.statusRowHistory,
                    isOrdersHistoryOpened: false,
                    ordersRowHistory: mapping.ordersRowHistory,
                    isSellingsHistoryOpened: false,
                    sellingsRowHistory: mapping.sellingsRowHistory,
                    isPublicationsHistoryOpened: false,
                    publicationsRowHistory: mapping.publicationsRowHistory,
                };
            });

            setTableData(arrQRowsVal);
        }
    }, [details?.qualityStatuses, t]);

    const handleChange = (recordId: string, value: string) => {
        setIsChangesInData(true);

        if (value === EBlockers.BlockOrders) {
            setTableData(prevState =>
                prevState.map(el =>
                    el.id === recordId ? {...el, blockOrders: !el.blockOrders, isBlockOrderOpened: true} : el
                )
            );
        }
        if (value === EBlockers.BlockSellings) {
            setTableData(prevState =>
                prevState.map(el =>
                    el.id === recordId ? {...el, blockSellings: !el.blockSellings, isBlockSellingsOpened: true} : el
                )
            );
        }
        if (value === EBlockers.BlockPublics) {
            setTableData(prevState =>
                prevState.map(el =>
                    el.id === recordId ? {...el, blockPublics: !el.blockPublics, isBlockPublicsOpened: true} : el
                )
            );
        }
    };

    const handleBlockersComments = (recordId: string, comment: string, value: string) => {
        if (value === EBlockers.BlockOrders) {
            setTableData(prevState =>
                prevState.map(el => {
                    if (el.id === recordId) {
                        setIsChangesInData(true);
                        return {...el, blockOrdersComment: comment};
                    } else {
                        return el;
                    }
                })
            );
        }
        if (value === EBlockers.BlockSellings) {
            setTableData(prevState =>
                prevState.map(el => {
                    if (el.id === recordId) {
                        setIsChangesInData(true);
                        return {...el, blockSellingsComment: comment};
                    } else {
                        return el;
                    }
                })
            );
        }
        if (value === EBlockers.BlockPublics) {
            setTableData(prevState =>
                prevState.map(el => {
                    if (el.id === recordId) {
                        setIsChangesInData(true);
                        return {...el, blockPublicsComment: comment};
                    } else {
                        return el;
                    }
                })
            );
        }
    };

    const handleSelect = (recordId: string) => (value: string | null) => {
        if (value) {
            setTableData(prevState =>
                prevState.map(el => {
                    if (el.id === recordId) {
                        setIsChangesInData(true);
                        return {
                            ...el,
                            ruStatus: value,
                            engStatus: getQualityStatus(ELanguages.ENG, value),
                            isStatusCommentOpened: true,
                        };
                    } else {
                        return el;
                    }
                })
            );
        }
    };

    const handleStatusComment = (recordId: string, comment: string) => {
        setTableData(prevState =>
            prevState.map(el => {
                if (el.id === recordId) {
                    setIsChangesInData(true);
                    return {...el, statusComment: comment};
                } else {
                    return el;
                }
            })
        );
    };

    const updateChangesOnServer = async () => {
        const commonProductFields = {
            productId,
            productWithSubstances: details?.productWithSubstances,
            qualityModelId: details?.qualityModelId,
        };
        const body: IUpdateBodyReq = prepareUpdateBody(tableData, commonProductFields);

        const update = await postUpdateProduct({body, securityCode}).unwrap();
        setDetails(update[0]);
        setIsChangesInData(false);
    };

    const discardChanges = () => {
        setDetails(undefined);
        setIsDiscardChanges(true);
        setIsChangesInData(false);
    };

    const handleHistoryTables = (recordId: string, dataIndex: string) => {
        if (dataIndex === DataIndexQtable.Statuses) {
            setTableData(prevState =>
                prevState.map(el => {
                    if (el.id === recordId) {
                        return {...el, isStatusHistoryOpened: !el.isStatusHistoryOpened};
                    } else {
                        return el;
                    }
                })
            );
        }

        if (dataIndex === DataIndexQtable.BlockOrders) {
            setTableData(prevState =>
                prevState.map(el => {
                    if (el.id === recordId) {
                        return {...el, isOrdersHistoryOpened: !el.isOrdersHistoryOpened};
                    } else {
                        return el;
                    }
                })
            );
        }

        if (dataIndex === DataIndexQtable.BlockSellings) {
            setTableData(prevState =>
                prevState.map(el => {
                    if (el.id === recordId) {
                        return {...el, isSellingsHistoryOpened: !el.isSellingsHistoryOpened};
                    } else {
                        return el;
                    }
                })
            );
        }

        if (dataIndex === DataIndexQtable.BlockPublics) {
            setTableData(prevState =>
                prevState.map(el => {
                    if (el.id === recordId) {
                        return {...el, isPublicationsHistoryOpened: !el.isPublicationsHistoryOpened};
                    } else {
                        return el;
                    }
                })
            );
        }
    };

    const attr_columns = prepareQstatusesColumns(
        handleSelect,
        handleChange,
        handleStatusComment,
        handleBlockersComments,
        handleHistoryTables
    );

    return (
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

            {/* <Grid rowGap={16} columnGap={16} columns="1fr">
                <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Comments')}</Typography>
                <Textarea />
            </Grid> */}
            <RegularButton
                disabled={!isChangesInData}
                onClick={updateChangesOnServer}
                className={stylesProductQStatus.butt}
            >
                Отправить
            </RegularButton>
            <RegularButton
                variant="alert"
                disabled={!isChangesInData}
                onClick={discardChanges}
                className={stylesProductQStatus.butt}
            >
                Сбросить изменения
            </RegularButton>
        </Grid>
    );
};

export default ProductDetailsQualityStatusSection;
