import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProviderTableItem} from '../../../../common/clientModels';
import {IProvidersResponse} from '../../../../common/types/providers';
import {RawTable} from '.';

export interface IDataType extends IProvidersResponse, IProviderTableItem {
    key: React.Key;
}

export const getProviderTableColumns = (t: TFunction<'providers', undefined, 'providers'>): ColumnsType<RawTable> => [
    {
        title: t('ProvidersList.Table.Columns.providerName'),
        dataIndex: 'supplierName',
        render: (text: string) => <div>{text}</div>,
        width: 246,
    },
    {
        title: t('ProvidersList.Table.Columns.providerCode'),
        dataIndex: 'supplierRMSCode',
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
