import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskTableTasks} from '../../../../../../common/clientModels';
import {Grid} from 'fronton-react';

export interface IDataType extends ITaskTableTasks {
    key: React.Key;
}

export const getTasksTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<IDataType> => [
    {
        title: t('TaskTabs.Tasks.TaskNumber'),
        dataIndex: 'taskNumber',
        width: 130,
    },
    {
        title: t('TaskTabs.Tasks.EAN'),
        dataIndex: 'EAN',
        width: 160,
    },
    {
        title: t('TaskTabs.Tasks.ProviderLink'),
        dataIndex: 'providerLink',
        width: 160,
    },
    {
        title: t('TaskTabs.Tasks.MatrixId'),
        dataIndex: 'matrixId',
        width: 180,
    },
    {
        title: t('TaskTabs.Tasks.DocumentStatus'),
        dataIndex: 'documentStatus',
        render: (text: string) => {
            if (text === 'Ожидает согласования') {
                return (
                    <Grid columns="0.1fr 1fr">
                        <div
                            style={{
                                borderRadius: '50%',
                                alignSelf: 'center',
                                backgroundColor: '#ECC600',
                                width: '7px',
                                height: '7px',
                            }}
                        />
                        <div style={{color: '#ECC600'}}>{text}</div>
                    </Grid>
                );
            }
            if (text === 'Согласовано') {
                return (
                    <Grid columns="0.1fr 1fr">
                        <div
                            style={{
                                borderRadius: '50%',
                                alignSelf: 'center',
                                backgroundColor: '#5AB030',
                                width: '7px',
                                height: '7px',
                            }}
                        />
                        <div style={{color: '#5AB030'}}>{text}</div>
                    </Grid>
                );
            }
        },
        width: 180,
    },
    {
        title: t('TaskTabs.Tasks.ShopCode'),
        dataIndex: 'shopCode',
        width: 160,
    },
    {
        title: t('TaskTabs.Tasks.Product'),
        dataIndex: 'product',
        width: 300,
    },
    {
        title: t('TaskTabs.Tasks.TaskStatus'),
        dataIndex: 'taskStatus',
        width: 300,
    },
];
