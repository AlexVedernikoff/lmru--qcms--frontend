import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {ChatIcon, ChatTextIcon, MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {TASK_LIST_ITEMS} from '../../../../common/mocks';
import {TASKS_ROUTES} from '../../../../common/consts';
import {IDataType, getTableColumns} from './TableColumns';
import CustomTable from '../../../Common/CustomTable';

const Table: React.FC = () => {
    const {t} = useTranslation('tasks');
    const navigate = useNavigate();

    const handleViewDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(TASKS_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: IDataType) => (
                    <RegularButton
                        data-id={record.productCode.toString()}
                        onClick={() => {}}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                    >
                        {true ? <ChatTextIcon /> : <ChatIcon />}
                    </RegularButton>
                ),
                fixed: 'left',
            },
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: IDataType) => (
                    <RegularButton
                        data-id={record.productCode.toString()}
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
            ...getTableColumns(t),
        ],
        [handleViewDetails, t]
    );

    const data = useMemo<IDataType[]>(() => TASK_LIST_ITEMS, []);

    const rowSelection = useMemo<TableRowSelection<IDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
            dataSource={data}
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
