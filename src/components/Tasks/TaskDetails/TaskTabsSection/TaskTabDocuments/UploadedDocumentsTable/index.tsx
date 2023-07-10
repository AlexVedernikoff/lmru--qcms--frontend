import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import {getTableColumns} from './TableColumns';
import CustomTable from '../../../../../Common/CustomTable';
import {ITaskDetails, ITaskProductDetails, ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';
import {notification} from 'antd';
import {taskDetailsApi} from '../../../api';
import {useParams} from 'react-router-dom';

interface Props {
    taskDetails: ITaskDetails;
}

const UploadedDocumentsTable: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');
    const [api, contextHolder] = notification.useNotification();
    const [statusDocument] = taskDetailsApi.useUpdateStatusDocumentMutation();
    const {id} = useParams();

    const deleteDocument = useCallback(
        (document: ITaskUploadedDocument) => {
            const removeProductBundle = document?.productsDetails?.find(
                (el: ITaskProductDetails) => el?.qualityActionId?.toString() === id
            );
            statusDocument({
                updatedBy: 'Aleftina',
                documents: [{id: document.id, removeProductBundle: [removeProductBundle?.id!]}],
            })
                .unwrap()
                .then(
                    () => {
                        api.open({
                            message: 'Запрос успешно отправлен!',
                        });
                    },
                    () => {
                        api.open({
                            message: 'Не удалось отправить запрос, повторите попытку позже',
                        });
                    }
                );
        },
        [api, id, statusDocument]
    );

    const columns = useMemo<ColumnsType<ITaskUploadedDocument>>(
        () => getTableColumns(t, deleteDocument),
        [deleteDocument, t]
    );
    const uploadedDocuments = taskDetails.documents.uploadedDocuments;

    const data = useMemo<ITaskUploadedDocument[]>(
        () => (uploadedDocuments || []).map(d => ({...d, key: d.id})),
        [uploadedDocuments]
    );

    return (
        <>
            {contextHolder}
            <CustomTable
                columns={columns}
                dataSource={data}
                scroll={{x: 400}}
                tableLayout="fixed"
                size="small"
                bordered
            />
        </>
    );
};

export default UploadedDocumentsTable;
