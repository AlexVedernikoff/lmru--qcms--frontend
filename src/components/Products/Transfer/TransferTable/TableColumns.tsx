import {Typography, RegularButton} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProductTableTransferItem} from '../../../../common/clientModels';
import styles from '../styles.module.css';

export interface IDataType extends IProductTableTransferItem {
    key: React.Key;
}

export const getTableColumns = (t: TFunction<'products', undefined, 'products'>): ColumnsType<IDataType> => [
    {
        title: t('Transfer.Table.Columns.creationDate'),
        dataIndex: 'creationDate',
        width: 200,
        render: data => (
            <div className={styles.flexRow}>
                <Typography variant="s" size="body_long">
                    {data}
                </Typography>

                <RegularButton
                    data-id={'test-id'}
                    onClick={() => {}}
                    href=""
                    rel=""
                    aria-label=""
                    variant="pseudo"
                    iconOnly
                >
                    <MagnifyingGlassIcon />
                </RegularButton>
            </div>
        ),
    },
    {
        title: t('Transfer.Table.Columns.productCodeAdeo'),
        dataIndex: 'productCodeAdeo',
        width: 200,
    },
    {
        title: t('Transfer.Table.Columns.productCode'),
        dataIndex: 'productCode',
        width: 200,
    },
    {
        title: t('Transfer.Table.Columns.productName'),
        dataIndex: 'productName',
        width: 490,
    },
    {
        title: t('Transfer.Table.Columns.providerName'),
        dataIndex: 'providerName',
        width: 580,
        render: data => (
            <div className={styles.flexRow}>
                <Typography variant="s" size="body_long">
                    {data}
                </Typography>

                <RegularButton
                    data-id={'test-id'}
                    onClick={() => {}}
                    href=""
                    rel=""
                    aria-label=""
                    variant="pseudo"
                    iconOnly
                >
                    <MagnifyingGlassIcon />
                </RegularButton>
            </div>
        ),
    },
];
