import {TaskActions} from '../TaskActionsForm';
import TaskUpdateStatusDocumentsModal from '../TaskUpdateStatusDocumentsModal';
import {ITaskUploadedDocument} from '../../../../common/types/taskDetails';

interface Props {
    onClose: () => void;
    uploadedDocuments: ITaskUploadedDocument[];
    action: TaskActions | null;
}

const ModalWindowsGroup: React.FC<Props> = ({onClose, uploadedDocuments, action}) => {
    return (
        <>
            <TaskUpdateStatusDocumentsModal
                onClose={onClose}
                uploadedDocuments={uploadedDocuments}
                show={action === TaskActions.UpdateStatusDocuments}
            />
        </>
    );
};

export default ModalWindowsGroup;
