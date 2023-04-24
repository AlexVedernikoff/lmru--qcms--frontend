import {useMemo} from 'react';
import {BackofficeStatus, Grid, RegularButton, Typography} from 'fronton-react';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import HistoryBack from '../../../Icons/HistoryBack';
import styles from '../ProductsDetails.module.css';

interface IAttributes {
    id: string;
    characteristics: string;
    available: boolean;
    type: string;
}

const ATTRIBUTES: IAttributes[] = [
    {
        id: '123123',
        available: true,
        characteristics: 'Аэрозоль',
        type: 'required',
    },
];

interface IDataType extends IAttributes {
    key: React.Key;
}

const ProductsDetailsAttributes: React.FC = () => {
    const attr_columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: 'Характеристики',
                dataIndex: 'characteristics',
            },
            {
                title: 'Наличие',
                dataIndex: 'available',
                render: (isAvailable: boolean) => (
                    <div>
                        <BackofficeStatus align="left" text="" variant={isAvailable ? 'success' : 'alert'} />
                        {isAvailable ? 'Да' : 'Нет'}
                    </div>
                ),
            },
            {
                title: 'Тип',
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
                        <HistoryBack />
                    </RegularButton>
                ),
            },
        ],
        []
    );

    const attr_data = useMemo<IDataType[]>(() => ATTRIBUTES.map(d => ({...d, key: d.id})), []);

    return (
        <Grid className={styles.sectionItem} rowGap={16} columnGap={16}>
            <Grid rowGap={4} columns="1fr">
                <Typography variant="h3">{'Атрибуты'}</Typography>
            </Grid>

            <Grid rowGap={4} columns="1fr">
                <Table columns={attr_columns} dataSource={attr_data} pagination={false} size="small" />
            </Grid>
        </Grid>
    );
};

export default ProductsDetailsAttributes;
