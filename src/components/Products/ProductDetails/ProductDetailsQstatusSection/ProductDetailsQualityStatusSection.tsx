import {BackofficeStatus, Grid, Typography, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import CustomTable from '../../../Common/CustomTable';
import styles from '../../../Common.module.css';

import productDetailsStyles from './productDetailsQstatuses.module.css';

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
                    isValidBlockOrders: true,
                    blockSellings: mapping.blockedForSellings,
                    blockSellingsComment: '',
                    isBlockSellingsOpened: false,
                    isValidBlockSellings: true,
                    blockPublics: mapping.blockedForPublics,
                    blockPublicsComment: '',
                    isBlockPublicsOpened: false,
                    isValidBlockPublics: true,
                    ruStatus: mapping.ruStatus,
                    engStatus: mapping.engStatus,
                    isStatusCommentOpened: false,
                    statusComment: '',
                    isValidStatus: true,
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
                    el.id === recordId
                        ? {...el, blockOrders: !el.blockOrders, isBlockOrderOpened: true, isValidBlockOrders: false}
                        : el
                )
            );
        }
        if (value === EBlockers.BlockSellings) {
            setTableData(prevState =>
                prevState.map(el =>
                    el.id === recordId
                        ? {
                              ...el,
                              blockSellings: !el.blockSellings,
                              isBlockSellingsOpened: true,
                              isValidBlockSellings: false,
                          }
                        : el
                )
            );
        }
        if (value === EBlockers.BlockPublics) {
            setTableData(prevState =>
                prevState.map(el =>
                    el.id === recordId
                        ? {
                              ...el,
                              blockPublics: !el.blockPublics,
                              isBlockPublicsOpened: true,
                              isValidBlockPublics: false,
                          }
                        : el
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

                        if (comment) {
                            return {...el, blockOrdersComment: comment, isValidBlockOrders: true};
                        } else {
                            return {...el, blockOrdersComment: comment, isValidBlockOrders: false};
                        }
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
                        if (comment) {
                            return {...el, blockSellingsComment: comment, isValidBlockSellings: true};
                        } else {
                            return {...el, blockSellingsComment: comment, isValidBlockSellings: false};
                        }
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

                        if (comment) {
                            return {...el, blockPublicsComment: comment, isValidBlockPublics: true};
                        } else {
                            return {...el, blockPublicsComment: comment, isValidBlockPublics: false};
                        }
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
                            isValidStatus: false,
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
                    if (comment) {
                        return {...el, statusComment: comment, isValidStatus: true};
                    } else {
                        return {...el, statusComment: comment, isValidStatus: false};
                    }
                } else {
                    return el;
                }
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
                qualityModelId: details?.qualityModelId,
            };
            const body: IUpdateBodyReq = prepareUpdateBody(tableData, commonProductFields);

            try {
                await postUpdateProduct({body, securityCode}).unwrap();
            } catch (error) {
                alert('Ошибка при обновлении продукта');
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
    );
};

export default ProductDetailsQualityStatusSection;
