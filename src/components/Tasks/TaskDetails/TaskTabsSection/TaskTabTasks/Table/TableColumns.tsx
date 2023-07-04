import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskTableTasks} from '../../../../../../common/clientModels';
import {Grid} from 'fronton-react';
import {ITaskProductDetails, ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';

export interface IDataType extends ITaskTableTasks {
    key: React.Key;
}

export const getTasksTableColumns = (
    t: TFunction<'tasks', undefined, 'tasks'>,
    id: string
): ColumnsType<ITaskUploadedDocument> => [
    {
        title: t('TaskTabs.Tasks.TaskNumber'),
        dataIndex: 'linkedTaskIds',
        width: 130,
        render: text => <div> {text?.join(',')} </div>,
    },
    {
        title: t('TaskTabs.Tasks.EAN'),
        dataIndex: 'productsDetails',
        width: 160,
        render: text => {
            const productDetails = text?.find((el: ITaskProductDetails) => el?.qualityActionId?.toString() === id);
            return <div>{productDetails.ean}</div>;
        },
    },
    {
        title: t('TaskTabs.Tasks.ProviderLink'),
        dataIndex: 'productsDetails',
        width: 160,
        render: text => {
            const productDetails = text?.find((el: ITaskProductDetails) =>
                text?.find((el: ITaskProductDetails) => el?.qualityActionId?.toString() === id)
            );
            return <div>{productDetails.supplierRMSCode}</div>;
        },
    },
    {
        title: t('TaskTabs.Tasks.MatrixId'),
        dataIndex: 'matrixId',
        width: 180,
        render: text => {
            const productDetails = text?.find((el: ITaskProductDetails) => el?.qualityActionId?.toString() === id);
            return <div>{productDetails?.productTNVEDCode}</div>;
        },
    },
    {
        title: t('TaskTabs.Tasks.DocumentStatus'),
        dataIndex: 'productsDetails',
        render: text => {
            const productDetails = text?.find((el: ITaskProductDetails) => el?.qualityActionId?.toString() === id);

            if (productDetails?.approvingStatus === 'WAITING_FOR_APPROVAL') {
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
                        <div style={{color: '#ECC600'}}>{productDetails.approvingStatus}</div>
                    </Grid>
                );
            } else if (productDetails?.approvingStatus === 'APPROVED') {
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
                        <div style={{color: '#5AB030'}}>{productDetails.approvingStatus}</div>
                    </Grid>
                );
            } else return <div>{productDetails.approvingStatus}</div>;
        },
        width: 200,
    },
    {
        title: t('TaskTabs.Tasks.Product'),
        dataIndex: 'productsDetails',
        width: 300,
        render: text => {
            const productDetails = text?.find((el: ITaskProductDetails) => el?.qualityActionId?.toString() === id);
            return <div>{productDetails.productDescription}</div>;
        },
    },
    {
        title: t('TaskTabs.Tasks.TaskStatus'),
        dataIndex: 'productsDetails',
        width: 300,
        render: text => {
            // const productDetails = text?.find((el: ITaskProductDetails) => el?.qualityActionId === parseInt(id, 10))
            // TODO Добавят возврат с BFF позже
            return <div></div>;
        },
    },
];
