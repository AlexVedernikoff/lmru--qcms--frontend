import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskTableTasks} from '../../../../../../common/clientModels';
import {Grid} from 'fronton-react';
import {ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';

export interface IDataType extends ITaskTableTasks {
    key: React.Key;
}

export const getTasksTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<ITaskUploadedDocument> => [
    {
        title: t('TaskTabs.Tasks.TaskNumber'),
        dataIndex: 'linkedTasksIds',
        width: 130,
        render: text => <div>{text?.join(',')}</div>,
    },
    {
        title: t('TaskTabs.Tasks.EAN'),
        dataIndex: 'productInfoDetails',
        width: 160,
        render: text => <div>{text?.ean}</div>,
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
        dataIndex: 'productInfoDetails',
        render: text => {
            if (text?.productDescription === 'Ожидает согласования') {
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
                        <div style={{color: '#ECC600'}}>{text.productDescription}</div>
                    </Grid>
                );
            }
            if (text?.productDescription === 'Согласовано') {
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
        dataIndex: 'productInfoDetails',
        width: 300,
        render: text => <div>{text?.productDescription}</div>,
    },
    {
        title: t('TaskTabs.Tasks.TaskStatus'),
        dataIndex: 'taskStatus',
        width: 300,
    },
];
