import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskAwaitingDocument} from '../../../../../../common/models';

export interface IDataType extends ITaskAwaitingDocument {
    key: React.Key;
}

export const getTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<IDataType> => [
    {
        title: t('TaskTabs.Documents.AwaitingDocuments.Field.documentName'),
        dataIndex: 'documentName',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.AwaitingDocuments.Field.documentType'),
        dataIndex: 'documentType',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.AwaitingDocuments.Field.template'),
        dataIndex: 'template',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.AwaitingDocuments.Field.comment'),
        dataIndex: 'comment',
        width: 240,
    },
];
