import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {ChatIcon, ChatTextIcon, MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {TASKS_ROUTES} from '../../../common/consts';
import CustomTable from '../../Common/CustomTable';
import {TWithReactKey} from '../../../common/clientModels';
import {ITaskListResponse} from '../../../common/types/tasks';

type TDataType = TWithReactKey<ITaskListResponse['content'][number]>;

interface IProps {
    onPageChange: (page: number, size: number) => void;
    tableData: ITaskListResponse;
    isLoading: boolean;
}

const Table: React.FC<IProps> = ({onPageChange, tableData, isLoading}) => {
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
                width: 64,
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
                        {record.publicComments.length > 0 ? <ChatTextIcon /> : <ChatIcon />}
                    </RegularButton>
                ),
                fixed: 'left',
            },
            {
                title: '',
                dataIndex: undefined,
                width: 64,
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
                render: (v: TDataType['actionStatus']) => v,
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
            // {
            //     title: t('TaskList.Table.Columns.awaitedDocuments'),
            //     dataIndex: 'documents',
            //     width: 240,
            //     render: (v: TDataType['documents']) => v.awaitedDocuments.map(d => d.templateId).join(', '),
            // },
            // {
            //     title: t('TaskList.Table.Columns.taskCategory'),
            //     dataIndex: 'taskCategory',
            //     width: 240,
            // },
            // {
            //     title: t('TaskList.Table.Columns.creationDate'),
            //     dataIndex: 'creationDate',
            //     width: 240,
            // },
            // {
            //     title: t('TaskList.Table.Columns.confirmationEndDate'),
            //     dataIndex: 'confirmationEndDate',
            //     width: 240,
            // },
            // {
            //     title: t('TaskList.Table.Columns.responsibleContractor'),
            //     dataIndex: 'responsibleContractor',
            //     width: 240,
            // },
        ],
        [handleViewDetails, t]
    );

    const dataSource = useMemo<TDataType[]>(
        () => (tableData?.content || []).map(d => ({...d, key: d.id})),
        [tableData?.content]
    );

    const rowSelection = useMemo<TableRowSelection<TDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: TDataType[]) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            // getCheckboxProps: (record: IDataType) => ({
            //     disabled: record.qualityStatus === '2',
            //     name: record.qualityStatus,
            // }),
            fixed: 'left',
        }),
        []
    );

    return (
        <CustomTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            scroll={{x: true}}
            tableLayout="fixed"
            size="small"
            bordered
            expandable={{columnWidth: 100}}
            pagination={{}}
        />
    );
};

export default Table;
