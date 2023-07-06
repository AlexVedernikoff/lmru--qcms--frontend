import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskTableTasks} from '../../../../../../common/clientModels';
import {ITaskProductDetails} from '../../../../../../common/types/taskDetails';

export interface IDataType extends ITaskTableTasks {
    key: React.Key;
}

export const getTasksTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<ITaskProductDetails> => [
    {
        title: t('TaskTabs.Tasks.TaskNumber'),
        dataIndex: 'linkedTaskIds',
        width: 130,
        render: (_, {qualityActionId}: ITaskProductDetails) => qualityActionId,
    },
    {
        title: t('TaskTabs.Tasks.EAN'),
        dataIndex: 'productsDetails',
        width: 160,
        render: (_, {ean}: ITaskProductDetails) => ean,
    },
    {
        title: t('TaskTabs.Tasks.ProviderLink'),
        dataIndex: 'productsDetails',
        width: 160,
        render: (_, {supplierRMSCode}: ITaskProductDetails) => supplierRMSCode,
    },
    {
        title: t('TaskTabs.Tasks.MatrixId'),
        dataIndex: 'matrixId',
        width: 180,
        render: (_, {productTNVEDCode}: ITaskProductDetails) => productTNVEDCode,
    },
    {
        title: t('TaskTabs.Tasks.DocumentStatus'),
        dataIndex: 'productsDetails',
        width: 200,
        render: (_, {approvingStatus}: ITaskProductDetails) => approvingStatus,
    },
    {
        title: t('TaskTabs.Tasks.Product'),
        dataIndex: 'productsDetails',
        width: 300,
        render: (_, {productDescription}: ITaskProductDetails) => productDescription,
    },
    {
        title: t('TaskTabs.Tasks.TaskStatus'),
        dataIndex: 'productsDetails',
        width: 300,
        render: (_, {approvingStatus}: ITaskProductDetails) => approvingStatus,
    },
];
