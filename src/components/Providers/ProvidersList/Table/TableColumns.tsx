import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProviderTableItem} from '../../../../common/clientModels';

export interface IDataType extends IProviderTableItem {
    key: React.Key;
}

export const getProviderTableColumns = (t: TFunction<'providers', undefined, 'providers'>): ColumnsType<IDataType> => [
    {
        title: t('ProvidersList.Table.Columns.providerName'),
        dataIndex: 'providerName',
        render: (text: string) => <div>{text}</div>,
        width: 246,
    },
    {
        title: t('ProvidersList.Table.Columns.providerCode'),
        dataIndex: 'providerCode',
        width: 124,
    },
    {
        title: t('ProvidersList.Table.Columns.providerCertified'),
        dataIndex: 'providerCertified',
        width: 346,
    },
    {
        title: t('ProvidersList.Table.Columns.providerWoodProducts'),
        dataIndex: 'providerWoodProducts',
        width: 160,
    },
];
