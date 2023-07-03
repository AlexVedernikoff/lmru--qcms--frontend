import {Dropdown, DropdownItem, Grid, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import ModalWindowsGroup from '../ModalWindowsGroup';

import styles from './styles.module.css';
import {ITaskDetails} from '../../../../common/types/taskDetails';

export enum TaskActions {
    UpdateStatusDocuments = 'UpdateStatusDocuments',
}

interface Props {
    taskDetails: ITaskDetails;
}

const TaskActionsForm: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');
    const uploadedDocuments = taskDetails.documents.uploadedDocuments;
    const [action, setAction] = useState<TaskActions | null>(null);
    const [submitedAction, setSubmitedAction] = useState<TaskActions | null>(null);

    const handleActionSelect = (action: string | null) => {
        const newAction = action as TaskActions;
        setAction(prevAction => (prevAction === newAction ? null : newAction));
    };

    const isSubmitButtonDisabled = !uploadedDocuments.length || !action;

    const handleSubmit = () => {
        setSubmitedAction(action);
    };

    const handleModalClose = () => {
        setSubmitedAction(null);
    };

    return (
        <>
            <ModalWindowsGroup
                onClose={handleModalClose}
                uploadedDocuments={uploadedDocuments}
                action={submitedAction}
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
                            text={t('TaskTabs.Actions.actions.updateDocument')}
                            value={TaskActions.UpdateStatusDocuments}
                        />
                    </Dropdown>
                    <RegularButton size="m" variant="primary" onClick={handleSubmit} disabled={isSubmitButtonDisabled}>
                        {t('TaskTabs.Actions.applyAction')}
                    </RegularButton>
                </Grid>
            </Grid>
        </>
    );
};

export default TaskActionsForm;
