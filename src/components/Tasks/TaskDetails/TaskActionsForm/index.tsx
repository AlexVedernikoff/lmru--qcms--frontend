import {Dropdown, DropdownItem, Grid, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {ITaskDetails} from '../../../../common/types/taskDetails';
import TaskUploadDocumentModal from '../TaskUploadDocumentModal';
import TaskUpdateDocumentModal from '../TaskUpdateDocumentModal';

import styles from './styles.module.css';

export enum TaskActions {
    UploadDocument = 'UploadDocument',
    UpdateDocument = 'UpdateDocument',
}

interface Props {
    taskDetails: ITaskDetails;
}

const TaskActionsForm: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');
    const [action, setAction] = useState<TaskActions | null>(null);
    const [submitedAction, setSubmitedAction] = useState<TaskActions | null>(null);

    const handleActionSelect = (action: string | null) => {
        const newAction = action as TaskActions;
        setAction(prevAction => (prevAction === newAction ? null : newAction));
    };

    const handleSubmit = () => {
        setSubmitedAction(action);
    };

    const handleModalWindowClose = () => {
        setSubmitedAction(null);
    };

    const {uploadedDocuments} = taskDetails.documents;

    return (
        <>
            <TaskUploadDocumentModal
                show={submitedAction === TaskActions.UploadDocument}
                onClose={handleModalWindowClose}
                taskDetails={taskDetails}
            />
            <TaskUpdateDocumentModal
                show={submitedAction === TaskActions.UpdateDocument}
                onClose={handleModalWindowClose}
                uploadedDocuments={uploadedDocuments}
            />
            <Grid className={styles.grid} rowGap={16} columns="auto auto" justifyContent="end" alignItems="baseline">
                <Grid columns="387px 126px" columnGap={16}>
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('TaskTabs.Actions.chooseActionPlaceholder')}
                        label={t('TaskTabs.Actions.chooseActionLabel')}
                        value={action || undefined}
                        onSelect={handleActionSelect}
                    >
                        <DropdownItem
                            text={t('TaskTabs.Actions.actions.uploadDocument')}
                            value={TaskActions.UploadDocument}
                        />
                        <DropdownItem
                            text={t('TaskTabs.Actions.actions.updateDocument')}
                            value={TaskActions.UpdateDocument}
                            disabled={!uploadedDocuments.length}
                        />
                    </Dropdown>
                    <RegularButton size="m" variant="primary" onClick={handleSubmit} disabled={!action}>
                        {t('TaskTabs.Actions.applyAction')}
                    </RegularButton>
                </Grid>
            </Grid>
        </>
    );
};

export default TaskActionsForm;
