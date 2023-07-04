import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTasksTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {TableRowSelection} from 'antd/es/table/interface';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {Grid, RegularButton} from 'fronton-react';
import {ITaskDetails, ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';
import {useParams} from 'react-router-dom';

interface Props {
    taskDetails: ITaskDetails;
}

const TasksTable: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');
    const {id} = useParams();
    const uploadedDocuments = taskDetails.documents.uploadedDocuments;
    const handleViewProductDetails: React.MouseEventHandler<HTMLAnchorElement> = useCallback(e => {
        //TODO добавить детализацию
    }, []);

    const columns = useMemo<ColumnsType<ITaskUploadedDocument>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: ITaskUploadedDocument) => (
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
            ...getTasksTableColumns(t, id!),
        ],
        [handleViewProductDetails, id, t]
    );

    const data = useMemo<ITaskUploadedDocument[]>(
        () => (uploadedDocuments || []).map(d => ({...d, key: d.id})),
        [uploadedDocuments]
    );

    const rowSelection = useMemo<TableRowSelection<ITaskUploadedDocument>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: ITaskUploadedDocument[]) => {
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
