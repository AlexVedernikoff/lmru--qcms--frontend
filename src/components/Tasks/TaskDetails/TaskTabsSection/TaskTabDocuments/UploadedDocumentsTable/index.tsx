import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {PropsTaskDetails} from '../../../TaskDetails';
import {ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';
import FilesUploaderForm from '../../../../../Common/FilesUploaderForm';

const UploadedDocumentsTable: React.FC<PropsTaskDetails> = props => {
    const {t} = useTranslation('tasks');
    const {taskDetails} = props;
    const columns = useMemo<ColumnsType<ITaskUploadedDocument>>(() => getTableColumns(t), [t]);
    const uploadedDocuments = taskDetails.documents.uploadedDocuments;

    const data = useMemo<ITaskUploadedDocument[]>(
        () => (uploadedDocuments || []).map(d => ({...d, key: d.id})),
        [uploadedDocuments]
    );

    return (
        <>
            <CustomTable
                columns={columns}
                dataSource={data}
                scroll={{x: 400}}
                tableLayout="fixed"
                size="small"
                bordered
            />
            <FilesUploaderForm />
        </>
    );
};

export default UploadedDocumentsTable;
