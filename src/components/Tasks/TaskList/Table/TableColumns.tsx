import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskListItem} from '../../../../common/models';

export interface IDataType extends ITaskListItem {
    key: React.Key;
}

export const getTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<IDataType> => [
    {
        title: t('TaskList.Table.Columns.taskType'),
        dataIndex: 'taskType',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.taskStatus'),
        dataIndex: 'taskStatus',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.documents'),
        dataIndex: 'documents',
        width: 450,
    },
    {
        title: t('TaskList.Table.Columns.productCode'),
        dataIndex: 'productCode',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.productName'),
        dataIndex: 'productName',
        width: 440,
    },
    {
        title: t('TaskList.Table.Columns.providerName'),
        dataIndex: 'providerName',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.providerCode'),
        dataIndex: 'providerCode',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.qualityStatus'),
        dataIndex: 'qualityStatus',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.QE'),
        dataIndex: 'QE',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.SQM'),
        dataIndex: 'SQM',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.taskNumber'),
        dataIndex: 'taskNumber',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.expectedDocuments'),
        dataIndex: 'expectedDocuments',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.taskCategory'),
        dataIndex: 'taskCategory',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.creationDate'),
        dataIndex: 'creationDate',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.confirmationEndDate'),
        dataIndex: 'confirmationEndDate',
        width: 240,
    },
    {
        title: t('TaskList.Table.Columns.responsibleContractor'),
        dataIndex: 'responsibleContractor',
        width: 240,
    },
];
