import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProviderContactsTableItem} from '../../../../../../common/clientModels';

export interface IDataType extends IProviderContactsTableItem {
    key: React.Key;
}

export const getContactsTableColumns = (t: TFunction<'providers', undefined, 'providers'>): ColumnsType<IDataType> => [
    {
        title: t('ProviderDetails.ProviderTabs.Contacts.surname'),
        dataIndex: 'surname',
        width: 124,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Contacts.name'),
        dataIndex: 'name',
        width: 346,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Contacts.email'),
        dataIndex: 'email',
        width: 160,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Contacts.telephone'),
        dataIndex: 'telephone',
        width: 160,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Contacts.mobile'),
        dataIndex: 'mobile',
        width: 160,
    },
    {
        title: t('ProviderDetails.ProviderTabs.Contacts.type'),
        dataIndex: 'type',
        width: 160,
    },
];
