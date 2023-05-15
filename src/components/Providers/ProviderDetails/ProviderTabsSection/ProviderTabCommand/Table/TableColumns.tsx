import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProviderCommandTableItem} from '../../../../../../common/models';

export interface IDataType extends IProviderCommandTableItem {
    key: React.Key;
}

export const getCommandTableColumns = (t: TFunction<'providers', undefined, 'providers'>): ColumnsType<IDataType> => [
    {
        title: t('ProviderDetails.ProviderTabs.ProjectCommand.userServiceNumber'),
        dataIndex: 'userServiceNumber',
        render: (text: string) => <div>{text}</div>,
        width: 246,
    },
    {
        title: t('ProviderDetails.ProviderTabs.ProjectCommand.surname'),
        dataIndex: 'surname',
        width: 124,
    },
    {
        title: t('ProviderDetails.ProviderTabs.ProjectCommand.name'),
        dataIndex: 'name',
        width: 346,
    },
    {
        title:t('ProviderDetails.ProviderTabs.ProjectCommand.email'),
        dataIndex: 'email',
        width: 160,
    },
    {
        title:t('ProviderDetails.ProviderTabs.ProjectCommand.activityTypeCode'),
        dataIndex: 'activityTypeCode',
        width: 160,
    },
];