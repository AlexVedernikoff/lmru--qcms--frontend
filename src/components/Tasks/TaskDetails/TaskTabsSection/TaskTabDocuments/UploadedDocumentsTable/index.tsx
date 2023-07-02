import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {ITaskDetails, ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';
import FileImmediatelyUploadForm from '../../../../../Common/FileImmediatelyUploadForm';

interface Props {
    taskDetails: ITaskDetails;
}

const UploadedDocumentsTable: React.FC<Props> = props => {
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
            <FileImmediatelyUploadForm
                documentMetadata={{
                    type: 'test al',
                    isTemplate: false,
                    isForLot: false,
                    createdBy: 'string',
                    productsDetails: [],
                }}
            />
        </>
    );
};

export default UploadedDocumentsTable;
