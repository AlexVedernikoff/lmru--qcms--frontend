import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {ChatIcon, ChatTextIcon, MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TASKS_ROUTES} from '../../../common/consts';
import CustomTable from '../../Common/CustomTable';
import {ITaskListResponse} from '../../../common/types/tasks';
import {convertDateFromServer} from '../../../utils/convertDateFromServer';
import ResponsibleModal from './ActionModals/ResponsibleModal';
import DocumnentModal from './ActionModals/DocumentsModal';
import ApproverModal from './ActionModals/ApproverModal';
import {EModalVariant, TDataType} from './types';
import NotFound from '../../Icons/NotFound';

interface IProps {
    onPageChange: (page: number, size: number) => void;
    onActionClose: (isCompleted?: boolean) => void;
    tableData: ITaskListResponse;
    isLoading: boolean;
    action: EModalVariant | undefined;
    isActionOpen: boolean;
    selectedRows: TDataType[];
    setSelectedRows: (selectedRowKeys: React.Key[], selectedRows: TDataType[]) => void;
}

const Table: React.FC<IProps> = ({
    onPageChange,
    tableData,
    isLoading,
    isActionOpen,
    onActionClose,
    selectedRows,
    setSelectedRows,
    action,
}) => {
    const navigate = useNavigate();
    const {t} = useTranslation('tasks');

    const handleViewDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(TASKS_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns = useMemo<ColumnsType<TDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 57,
                render: (_value: string, record: TDataType) => (
                    <RegularButton
                        data-id={'publicComments'}
                        onClick={() => {}}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                    >
                        {record.publicComments?.length > 0 ? <ChatTextIcon /> : <ChatIcon />}
                    </RegularButton>
                ),
                fixed: 'left',
            },
            {
                title: '',
                dataIndex: undefined,
                width: 57,
                render: (_value: string, record: TDataType) => (
                    <RegularButton
                        data-id={record.id}
                        onClick={handleViewDetails}
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
            {
                title: t('TaskList.Table.Columns.taskType'),
                dataIndex: 'categoryTypeName',
                width: 240,
                render: (v: TDataType['categoryTypeName']) => v,
            },
            {
                title: t('TaskList.Table.Columns.taskStatus'),
                dataIndex: 'actionStatus',
                width: 240,
                render: (v: TDataType['actionStatus']) => {
                    let status = null;

                    switch (v) {
                        case 'APPROVED':
                            status = 'Согласован';
                            break;
                        case 'REJECTED':
                            status = 'Отклонен';
                            break;
                        case 'DRAFT':
                            status = 'Черновик';
                            break;
                    }

                    return status;
                },
            },
            {
                title: t('TaskList.Table.Columns.documents'),
                dataIndex: 'documents',
                width: 450,
                render: (v: TDataType['documents']) => v.uploadedDocuments.map(d => d.id).join(', '),
            },
            {
                title: t('TaskList.Table.Columns.productCode'),
                dataIndex: 'product',
                width: 240,
                render: (v: TDataType['product']) => v.code,
            },
            {
                title: t('TaskList.Table.Columns.productName'),
                dataIndex: 'product',
                width: 440,
                render: (v: TDataType['product']) => v.name,
            },
            {
                title: t('TaskList.Table.Columns.providerName'),
                dataIndex: 'supplierData',
                width: 240,
                render: (v: TDataType['supplierData']) => v.name,
            },
            {
                title: t('TaskList.Table.Columns.providerCode'),
                dataIndex: 'supplierData',
                width: 240,
                render: (v: TDataType['supplierData']) => v.supplierRMSCode,
            },
            {
                title: t('TaskList.Table.Columns.qualityStatus'),
                dataIndex: 'conclusion',
                width: 240,
                render: (v: TDataType['conclusion']) => v,
            },
            {
                title: t('TaskList.Table.Columns.QE'),
                dataIndex: 'responsible',
                width: 240,
                render: (v: TDataType['responsible']) => v.map(d => d.externalId).join(', '),
            },
            {
                title: t('TaskList.Table.Columns.SQM'),
                dataIndex: 'responsible',
                width: 240,
                render: (v: TDataType['responsible']) => v.map(d => d.type).join(', '),
            },
            {
                title: t('TaskList.Table.Columns.taskNumber'),
                dataIndex: 'product',
                width: 240,
                render: (v: TDataType['product']) => v.ean,
            },
            {
                title: t('TaskList.Table.Columns.awaitedDocuments'),
                dataIndex: 'documents',
                width: 240,
                render: (v: TDataType['documents']) => v.awaitedDocuments?.map(d => d.templateId).join(', '),
            },
            {
                title: t('TaskList.Table.Columns.taskCategory'),
                dataIndex: 'categoryName',
                width: 240,
                render: (v: TDataType['categoryName']) => v,
            },
            {
                title: t('TaskList.Table.Columns.creationDate'),
                dataIndex: 'creationInformation',
                width: 240,
                render: (v: TDataType['creationInformation']) => convertDateFromServer(v.createdAt),
            },
            {
                title: t('TaskList.Table.Columns.confirmationEndDate'),
                dataIndex: 'conclusion',
                width: 240,
                render: (v: TDataType['conclusion']) => v,
            },
            {
                title: t('TaskList.Table.Columns.responsibleContractor'),
                dataIndex: 'responsible',
                width: 240,
                render: (v: TDataType['responsible']) => v.map(d => d.externalId).join(', '),
            },
        ],
        [handleViewDetails, t]
    );

    const dataSource = useMemo<TDataType[]>(
        () => (tableData?.content || []).map(d => ({...d, key: d.id})),
        [tableData?.content]
    );

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {(!dataSource?.length && !isLoading && <NotFound />) || (
                <CustomTable
                    loading={isLoading}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: setSelectedRows,
                        fixed: 'left',
                    }}
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{x: 400}}
                    tableLayout="fixed"
                    size="small"
                    bordered
                    pagination={{
                        pageSize: tableData?.pageable?.pageSize,
                        total: tableData?.pageable?.totalElements,
                        current: (tableData?.pageable?.pageIndex || 0) + 1,
                        onChange: onPageChange,
                    }}
                />
            )}
            {action === EModalVariant.documents && (
                <DocumnentModal dataList={selectedRows} isOpen={isActionOpen} onClose={onActionClose} />
            )}
            {action === EModalVariant.responsible && (
                <ResponsibleModal dataList={selectedRows} isOpen={isActionOpen} onClose={onActionClose} />
            )}
            {action === EModalVariant.approver && (
                <ApproverModal dataList={selectedRows} isOpen={isActionOpen} onClose={onActionClose} />
            )}
        </div>
    );
};

export default Table;
