import {BackofficeStatus, Grid, Textarea, Typography, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import CustomTable from '../../Common/CustomTable';
import styles from '../../Common.module.css';

import {ColumnsType} from 'antd/es/table';
import {useEffect, useMemo, useState} from 'react';

import {useGetDetailsForProductsQuery} from './productDetailsApi';

import {productId, securityCode} from './mockProductDetails';
import {qaulityStatusSectionMapping} from './productUtils.ts/ProductDetailsQaulityStatusSection/qaulityStatusSectionMapping';
import {IDataDeatailsQstatus} from '../../../common/types/productDetails';
import {prepareQstatusesColumns} from './productUtils.ts/ProductDetailsQaulityStatusSection/prepareQstatusesColumns';

export enum EBlockers {
    BlockOrders = 'blockOrders',
    BlockSellings = 'blockSellings',
    BlockPublics = 'blockPublics',
}

const ProductDetailsQualityStatusSection: React.FC = () => {
    const {t} = useTranslation('products');

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});

    const [tableData, setTableData] = useState<any[]>([]);
    const [isChangesInData, setIsChangesInData] = useState(false);

    useEffect(() => {
        if (details?.qualityStatuses && details?.qualityStatuses?.length > 0) {
            const arrQRowsVal = details.qualityStatuses.map((el: any, i: number) => {
                const mapping = qaulityStatusSectionMapping(el);

                return {
                    id: `${i}`,
                    bu: mapping.buCode,
                    statuses: mapping.arrQstatusesRu,
                    blockOrders: mapping.blockedForOrders,
                    blockSellings: mapping.blockedForSellings,
                    blockPublics: mapping.blockedForPublics,
                    curentStatus: mapping.qualityStatus,
                    prevStatus: mapping.qualityStatus,
                    isStatusCommentOpened: false,
                    statusComment: '',
                };
            });

            setTableData(arrQRowsVal);
        }
    }, [details?.qualityStatuses]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChange = (recordId: string, value: string) => {
        if (value === EBlockers.BlockOrders) {
            setTableData(prevState =>
                prevState.map((el: any) => (el.id === recordId ? {...el, blockOrders: !el.blockOrders} : el))
            );
        }
        if (value === EBlockers.BlockSellings) {
            setTableData(prevState =>
                prevState.map((el: any) => (el.id === recordId ? {...el, blockSellings: !el.blockSellings} : el))
            );
        }
        if (value === EBlockers.BlockPublics) {
            setTableData(prevState =>
                prevState.map((el: any) => (el.id === recordId ? {...el, blockPublics: !el.blockPublics} : el))
            );
        }
    };

    const handleSelect = (recordId: string) => (value: string | null) => {
        if (value) {
            setTableData(prevState =>
                prevState.map((el: any) => {
                    const prevVal = el.prevStatus;
                    if (el.id === recordId && prevVal !== value) {
                        return {...el, curentStatus: value, isStatusCommentOpened: true, statusComment: ''};
                    } else if (el.id === recordId && prevVal === value) {
                        return {...el, curentStatus: value, isStatusCommentOpened: false, statusComment: ''};
                    } else {
                        return el;
                    }
                })
            );
        }
    };

    const handleStatusComment = (recordId: string, comment: string) => {
        setTableData(prevState =>
            prevState.map((el: any) => (el.id === recordId ? {...el, statusComment: comment} : el))
        );
    };

    const handleSaveStatusComment = (record: IDataDeatailsQstatus) => {
        console.log('comment', record.statusComment);
        setTableData(prevState =>
            prevState.map((el: any) =>
                el.id === record.id
                    ? {
                          ...el,
                          statusComment: record.statusComment,
                          isStatusCommentOpened: false,
                      }
                    : el
            )
        );
        setIsChangesInData(true);
    };

    const updateChangesToServer = () => {};

    const attr_columns = useMemo<ColumnsType<IDataDeatailsQstatus>>(
        () => prepareQstatusesColumns(handleSelect, handleChange, handleStatusComment, handleSaveStatusComment),
        []
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

                    <CustomTable columns={attr_columns} dataSource={tableData} pagination={false} size="small" />
                </Grid>
            </Grid>

            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Comments')}</Typography>
                <Textarea />
            </Grid>
            <RegularButton disabled={!isChangesInData}>Отправить</RegularButton>
        </Grid>
    );
};

export default ProductDetailsQualityStatusSection;
