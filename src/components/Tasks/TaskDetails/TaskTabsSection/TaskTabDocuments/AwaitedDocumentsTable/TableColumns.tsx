import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskAwaitingDocument} from '../../../../../../common/types/taskDetails';

export interface IDataType extends ITaskAwaitingDocument {
    key: React.Key;
}

export const getTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<ITaskAwaitingDocument> => {
    return [
        {
            title: t('TaskTabs.Documents.AwaitedDocuments.Field.documentName'),
            dataIndex: 'documentName',
            width: 240,
        },
        {
            title: t('TaskTabs.Documents.AwaitedDocuments.Field.documentType'),
            dataIndex: 'type',
            width: 240,
        },
        {
            title: t('TaskTabs.Documents.AwaitedDocuments.Field.template'),
            dataIndex: 'template',
            width: 240,
        },
        {
            title: t('TaskTabs.Documents.AwaitedDocuments.Field.comment'),
            dataIndex: 'comment',
            width: 240,
        },
    ];
};
