import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTasksTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {TableRowSelection} from 'antd/es/table/interface';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {Grid, RegularButton} from 'fronton-react';
import {
    ITaskDetails,
    ITaskProductDetails,
    IUpdateDocumentParamsDocument,
    UpdateDocumentApprovingStatuses,
} from '../../../../../../common/types/taskDetails';
import {taskDetailsApi} from '../../../api';
import {notification} from 'antd';

interface Props {
    taskDetails: ITaskDetails;
}

const TasksTable: React.FC<Props> = ({taskDetails}) => {
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const {t} = useTranslation('tasks');

    const [selectedTaskProductsIds, setSelectedTaskProductsIds] = useState<number[]>([]);

    const [updateTaskDetails, updateTaskDetailsRequestState] = taskDetailsApi.useUpdateStatusDocumentMutation();

    const handleSubmit = (approvingStatus: UpdateDocumentApprovingStatuses) => {
        if (updateTaskDetailsRequestState.isLoading) return;

        const documents = taskDetails.documents.uploadedDocuments.reduce<IUpdateDocumentParamsDocument[]>(
            (accumulator, document) => {
                if (!document.productsDetails) return accumulator;
                const selectedTaskProducts = document.productsDetails.filter(({id}) =>
                    selectedTaskProductsIds.includes(id)
                );
                if (!selectedTaskProducts.length) return accumulator;
                const documentInfo: IUpdateDocumentParamsDocument = {
                    id: document.id,
                };
                return [
                    ...accumulator,
                    {
                        ...documentInfo,
                        approvingStatuses: selectedTaskProducts.map(({id}) => ({productId: id, approvingStatus})),
                    },
                ];
            },
            []
        );

        updateTaskDetails({
            updatedBy: 'Matvey',
            documents,
        });
    };

    useEffect(() => {
        if (updateTaskDetailsRequestState.isUninitialized || updateTaskDetailsRequestState.isLoading) return;
        if (updateTaskDetailsRequestState.isError) {
            notificationApi.open({
                message: 'Не удалось отправить запрос. Повторите попытку позже.',
            });
        }
        if (updateTaskDetailsRequestState.isSuccess) {
            notificationApi.open({
                message: 'Запрос успешно отправлен.',
            });
        }
        updateTaskDetailsRequestState.reset();
    }, [updateTaskDetailsRequestState, notificationApi]);

    const handleViewProductDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(e => {
        //TODO добавить детализацию
    }, []);

    const taskProductsDetails = useMemo(() => {
        const {uploadedDocuments} = taskDetails.documents;
        if (!uploadedDocuments) return [];
        return uploadedDocuments.reduce<ITaskProductDetails[]>((accumulator, {productsDetails}) => {
            if (!productsDetails) return accumulator;
            return [...accumulator, ...productsDetails];
        }, []);
    }, [taskDetails]);

    const columns = useMemo<ColumnsType<ITaskProductDetails>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: ITaskProductDetails) => (
                    <RegularButton
                        data-id={record.id.toString()}
                        onClick={handleViewProductDetails}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                    >
                        <MagnifyingGlassIcon />
                    </RegularButton>
                ),
                fixed: 'left',
            },
            ...getTasksTableColumns(t),
        ],
        [handleViewProductDetails, t]
    );

    const data = useMemo<ITaskProductDetails[]>(
        () => taskProductsDetails.map(taskProductDetails => ({...taskProductDetails, key: taskProductDetails.id})),
        [taskProductsDetails]
    );

    const rowSelection = useMemo<TableRowSelection<ITaskProductDetails>>(
        () => ({
            onChange: selectedTaskProductsIds => setSelectedTaskProductsIds(selectedTaskProductsIds as number[]),
        }),
        []
    );

    return (
        <>
            {notificationContextHolder}
            <CustomTable
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                scroll={{x: 400}}
                tableLayout="fixed"
                size="small"
                bordered
            />

            <Grid columnGap={16} columns="1fr 200px 200px">
                <span />
                <RegularButton
                    onClick={() => handleSubmit(UpdateDocumentApprovingStatuses.REJECTED)}
                    size="m"
                    variant="outline"
                    disabled={updateTaskDetailsRequestState.isLoading}
                >
                    {t('TaskTabs.Buttons.Reject')}
                </RegularButton>

                <RegularButton
                    onClick={() => handleSubmit(UpdateDocumentApprovingStatuses.APPROVED)}
                    size="m"
                    variant="primary"
                    disabled={updateTaskDetailsRequestState.isLoading}
                >
                    {t('TaskTabs.Buttons.Approve')}
                </RegularButton>
            </Grid>
        </>
    );
};

export default TasksTable;
