import {useEffect, useMemo, useState} from 'react';
import {BackofficeStatus, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import styles from '../../../Common.module.css';
import CustomTable from '../../../Common/CustomTable';
import {useGetDetailsForProductsQuery} from '../productDetailsApi';
import {productDetailsAttributesMapping} from '../ProductDetailsMapping/ProductDetailsInfoSection/ProductDetailsAttributes/productDetailsAttributesMapping';
import {useParams} from 'react-router-dom';

interface IAttributes {
    id: string;
    characteristics: string;
    available: string;
    type?: string;
}

interface IDataType extends IAttributes {
    key?: React.Key;
}

const ProductDetailsAttributes: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();

    const {data: details} = useGetDetailsForProductsQuery({productId});
    const [tableData, setTableData] = useState<IAttributes[]>([]);

    useEffect(() => {
        if (details?.productAttributes && details?.productAttributes?.length > 0) {
            const arrRowAttributes = details.productAttributes.map((el, i) => {
                const prepareAttributes = productDetailsAttributesMapping(el);
                return {
                    id: `${i}`,
                    characteristics: prepareAttributes.attributeName,
                    available: prepareAttributes.attributeValues,
                };
            });

            setTableData(arrRowAttributes);
        }
    }, [details?.productAttributes]);

    const ATTRIBUTES: IAttributes[] = useMemo(() => tableData, [tableData]);

    const attr_columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: t('ProductDetails.Info.Attributes.Table.Columns.characteristics'),
                dataIndex: 'characteristics',
                width: 100,
            },
            {
                title: t('ProductDetails.Info.Attributes.Table.Columns.available'),
                dataIndex: 'available',
                width: 100,
                render: (isAvailable: boolean) => (
                    <div>
                        <BackofficeStatus align="left" text="" variant={isAvailable ? 'success' : 'alert'} />
                        {isAvailable ? t('Common.Yes') : t('Common.No')}
                    </div>
                ),
            },
            // {
            //     title: t('ProductDetails.Info.Attributes.Table.Columns.type'),
            //     dataIndex: 'type',
            //     render: (text: string) => (
            //         <div style={{background: '#FFBDBD', width: '100%', height: '100%', padding: 8}}>{text}</div>
            //     ),
            // },
        ],
        [t]
    );

    const attr_data = useMemo<IDataType[]>(() => ATTRIBUTES.map(d => ({...d, key: d.id})), [ATTRIBUTES]);

    return (
        <Grid className={styles.sectionItem} rowGap={16} columnGap={16}>
            <Grid rowGap={4} columns="1fr">
                <Typography variant="h3">{t('ProductDetails.Info.Attributes.Title')}</Typography>
            </Grid>

            <Grid rowGap={4} columns="1fr">
                <CustomTable
                    scroll={{y: 300}}
                    bordered
                    columns={attr_columns}
                    dataSource={attr_data}
                    pagination={false}
                    size="small"
                />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsAttributes;
