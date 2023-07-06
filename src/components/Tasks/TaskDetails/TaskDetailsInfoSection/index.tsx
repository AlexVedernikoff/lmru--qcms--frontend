import {Grid, Typography} from 'fronton-react';
import {ITaskDetails, ITaskUpdateInfoParams} from '../../../../common/types/taskDetails';
import TaskDetailsInfoSectionViewMode from './TaskDetailsInfoSectionViewMode';
import TaskDetailsAddCommentsForm from '../TaskDetailsAddCommentsFrom/TaskDetailsAddCommentsFrom';
import {useEffect, useState} from 'react';
import TaskDetailsInfoEditForm from './TaskDetailsInfoEditForm';
import {taskDetailsApi} from '../api';
import EditTaskDetailsButton from './EditTaskDetailsButton';
import StopEditingButton from './StopEditingButton';

import styles from '../../../Common.module.css';

interface Props {
    taskDetails: ITaskDetails;
}

enum Status {
    View = 'View',
    Edit = 'Edit',
}

const ProductDetailsInfoSection: React.FC<Props> = ({taskDetails}) => {
    const title = `${taskDetails.categoryName} - ${taskDetails.categoryTypeName} - ${taskDetails.id}`;

    const [updateTaskDetails, updateTaskDetailsRequestState] = taskDetailsApi.useUpdateTaskDetailsMutation();

    const [status, setStatus] = useState(Status.View);

    const handleEditButtonClick = () => setStatus(Status.Edit);

    const handleStopEditingButtonClick = () => {
        if (updateTaskDetailsRequestState.isLoading || status !== Status.Edit) return;
        setStatus(Status.View);
    };

    const handleEditFormSubmit = (formData: ITaskUpdateInfoParams) => {
        if (updateTaskDetailsRequestState.isLoading || status !== Status.Edit) return;
        updateTaskDetails(formData);
    };

    useEffect(() => {
        if (status !== Status.Edit) return;
        const {isLoading, isSuccess, isUninitialized} = updateTaskDetailsRequestState;
        if (isLoading || isUninitialized) return;
        if (isSuccess) {
            alert('Данные успешно обновлены!');
        } else {
            alert('Не удалось выполнить запрос. Повторите попытку позже.');
        }
        setStatus(Status.View);
        updateTaskDetailsRequestState.reset();
    }, [status, updateTaskDetailsRequestState]);

    if (status === Status.View) {
        return (
            <Grid>
                <Typography variant="h2">{title}</Typography>
                <Grid columns="auto" justifyContent="end">
                    <EditTaskDetailsButton onClick={handleEditButtonClick} />
                </Grid>
                <Grid className={styles.panel} gap={16}>
                    <TaskDetailsInfoSectionViewMode taskDetails={taskDetails} />
                    <TaskDetailsAddCommentsForm taskDetails={taskDetails} />
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid>
            <Typography variant="h2">{title}</Typography>
            <Grid columns="auto" justifyContent="end">
                <StopEditingButton onClick={handleStopEditingButtonClick} />
            </Grid>
            <Grid className={styles.panel} gap={16}>
                <TaskDetailsInfoEditForm
                    taskDetails={taskDetails}
                    onSubmit={handleEditFormSubmit}
                    isSubmitButtonDisabled={updateTaskDetailsRequestState.isLoading}
                />
                <TaskDetailsAddCommentsForm taskDetails={taskDetails} />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsInfoSection;
