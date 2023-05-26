import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {IDataType, getTasksTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {TASK_TASKS_TABLE_ITEMS} from '../../../../../../common/mocks';
import {TableRowSelection} from 'antd/es/table/interface';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {Grid, RegularButton} from 'fronton-react';

const TasksTable: React.FC = () => {
    const {t} = useTranslation('tasks');

    const handleViewProductDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(e => {
        //TODO добавить детализацию
    }, []);

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: IDataType) => (
                    <RegularButton
                        data-id={record.taskNumber.toString()}
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

    const data = useMemo<IDataType[]>(() => TASK_TASKS_TABLE_ITEMS, []);

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
        <>
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
                <RegularButton onClick={() => {}} size="m" variant="outline">
                    {t('TaskTabs.Buttons.Reject')}
                </RegularButton>

                <RegularButton onClick={() => {}} size="m" variant="primary">
                    {t('TaskTabs.Buttons.Approve')}
                </RegularButton>
            </Grid>
        </>
    );
};

export default TasksTable;
