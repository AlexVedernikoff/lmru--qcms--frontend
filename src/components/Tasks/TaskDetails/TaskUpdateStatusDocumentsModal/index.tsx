import {Input, Modal, ModalContent, ModalFooter, ModalHeader} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {ITaskUploadedDocument} from '../../../../common/types/taskDetails';
import styles from './styles.module.css';

interface Props {
    show: boolean;
    onClose: () => void;
    uploadedDocuments: ITaskUploadedDocument[];
}

const TaskUpdateStatusDocumentsModal: React.FC<Props> = ({show, onClose, uploadedDocuments}) => {
    const {t} = useTranslation('tasks');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string, id: number) => {};
    return (
        <Modal onClose={onClose} show={show}>
            <ModalHeader title={t('TaskTabs.Actions.actions.updateStatusDocuments')} />
            <ModalContent>
                {uploadedDocuments.map((el, i) => {
                    return (
                        <div key={i} className={styles.container}>
                            <div>{el.fileName}</div>{' '}
                            <Input
                                id={el.id.toString()}
                                inputSize="m"
                                autoComplete="off"
                                label={'Status'}
                                name={'status'}
                                placeholder=""
                                onChange={e => handleInputChange(e, e.target.value, el.id)}
                            />
                        </div>
                    );
                })}
            </ModalContent>
            <ModalFooter></ModalFooter>
        </Modal>
    );
};

export default TaskUpdateStatusDocumentsModal;
