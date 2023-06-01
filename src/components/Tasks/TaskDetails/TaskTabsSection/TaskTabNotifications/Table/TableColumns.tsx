import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskTableNotification} from '../../../../../../common/clientModels';

export interface IDataType extends ITaskTableNotification {
    key: React.Key;
}

export const getProductsTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<IDataType> => [
    {
        title: t('TaskTabs.Notifications.Date'),
        dataIndex: 'date',
        width: 346,
    },
    {
        title: t('TaskTabs.Notifications.Topic'),
        dataIndex: 'topic',
        width: 160,
    },
    {
        title: t('TaskTabs.Notifications.TemplateName'),
        dataIndex: 'templateName',
        width: 160,
    },
    {
        title: t('TaskTabs.Notifications.Recipient'),
        dataIndex: 'recipient',
        width: 160,
    },
    {
        title: t('TaskTabs.Notifications.Text'),
        dataIndex: 'text',
        width: 160,
    },
];
