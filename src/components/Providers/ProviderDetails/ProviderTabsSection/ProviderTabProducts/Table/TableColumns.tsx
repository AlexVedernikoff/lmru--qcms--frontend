import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProviderProductsTableItem} from '../../../../../../common/clientModels';

export interface IDataType extends IProviderProductsTableItem {
    key: React.Key;
}

export const getProductsTableColumns = (t: TFunction<'providers', undefined, 'providers'>): ColumnsType<IDataType> => [
    {
        title: t('ProviderDetails.ProviderTabs.Products.name'),
        dataIndex: 'name',
        width: 346,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Products.code'),
        dataIndex: 'code',
        width: 160,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Products.SupplierBindingStatus'),
        dataIndex: 'SupplierBindingStatus',
        width: 160,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Products.SupplierLink'),
        dataIndex: 'SupplierLink',
        width: 160,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Products.EAN'),
        dataIndex: 'EAN',
        width: 160,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Products.ComplianceStatusBU'),
        dataIndex: 'ComplianceStatusBU',
        width: 160,
        render: (text: string = '') => (
            <ul>
                {text
                    .trimStart()
                    .trimEnd()
                    .split('\n')
                    .map((v, i) => (
                        <li key={i}>{v}</li>
                    ))}
            </ul>
        ),
    },
];
