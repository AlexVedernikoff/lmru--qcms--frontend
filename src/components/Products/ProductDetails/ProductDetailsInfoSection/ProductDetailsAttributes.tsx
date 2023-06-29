import {useMemo} from 'react';
import {BackofficeStatus, Grid, RegularButton, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import HistoryBackIcon from '../../../Icons/HistoryBackIcon';
import styles from '../../../Common.module.css';
import CustomTable from '../../../Common/CustomTable';

import {useGetDetailsForProductsQuery} from '../productDetailsApi';

import {productId, securityCode} from '../mockProductDetails';
import {productDetailsAttributesMapping} from '../productUtils.ts/ProductDetailsInfoSection/ProductDetailsAttributes/ProductDetailsAttributesMapping';

interface IAttributes {
    id: string;
    characteristics: string;
    available: boolean;
    type: string;
}

interface IDataType extends IAttributes {
    key: React.Key;
}

const ProductDetailsAttributes: React.FC = () => {
    const {t} = useTranslation('products');

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});

    const mapping = productDetailsAttributesMapping(details);

    const ATTRIBUTES: IAttributes[] = [
        {
            id: '123123',
            available: mapping.featureMultipleValue,
            characteristics: mapping.featureName,
            type: mapping.featureValues,
        },
    ];

    const attr_columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: t('ProductDetails.Info.Attributes.Table.Columns.characteristics'),
                dataIndex: 'characteristics',
            },
            {
                title: t('ProductDetails.Info.Attributes.Table.Columns.available'),
                dataIndex: 'available',
                render: (isAvailable: boolean) => (
                    <div>
                        <BackofficeStatus align="left" text="" variant={isAvailable ? 'success' : 'alert'} />
                        {isAvailable ? t('Common.Yes') : t('Common.No')}
                    </div>
                ),
            },
            {
                title: t('ProductDetails.Info.Attributes.Table.Columns.type'),
                dataIndex: 'type',
                render: (text: string) => (
                    <div style={{background: '#FFBDBD', width: '100%', height: '100%', padding: 8}}>{text}</div>
                ),
            },
            {
                title: '',
                dataIndex: undefined,
                width: 16,
                render: (_value: string, record: IDataType) => (
                    <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                        <HistoryBackIcon />
                    </RegularButton>
                ),
            },
        ],
        [t]
    );

    const attr_data = useMemo<IDataType[]>(() => ATTRIBUTES.map(d => ({...d, key: d.id})), []);

    return (
        <Grid className={styles.sectionItem} rowGap={16} columnGap={16}>
            <Grid rowGap={4} columns="1fr">
                <Typography variant="h3">{t('ProductDetails.Info.Attributes.Title')}</Typography>
            </Grid>

            <Grid rowGap={4} columns="1fr">
                <CustomTable columns={attr_columns} dataSource={attr_data} pagination={false} size="small" />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsAttributes;
