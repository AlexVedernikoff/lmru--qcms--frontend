import {Grid, Typography} from 'fronton-react';
import TaskDetailsProvider from './TaskDetailsProvider';
import TaskDetailsProduct from './TaskDetailsProduct';
import TaskDetailsQE from './TaskDetailsQE';
import TaskDetailsDates from './TaskDetailsDates';
import {ITaskDetails} from '../../../../common/types/taskDetails';
import EditTaskDetailsButton from '../EditTaskDetailsButton';
// import {taskDetailsApi} from '../api';
import TaskDetailsAddCommentsForm from '../TaskDetailsAddCommentsFrom/TaskDetailsAddCommentsFrom';

import styles from '../../../Common.module.css';

interface Props {
    taskDetails: ITaskDetails;
}

const ProductDetailsInfoSection: React.FC<Props> = ({taskDetails}) => {
    // const [updateTaskDetails] = taskDetailsApi.useUpdateTaskDetailsMutation();

    // Функция-обработчик события, когда юзер обновил данные задачи и нажал кнопку "submit".
    // const handleTaskDetailsUpdateSubmit = (taskUpdateDetails: ITaskUpdateInfoParams) => {
    //     updateTaskDetails(taskUpdateDetails)
    //         .unwrap()
    //         .then(
    //             () => {
    //                 alert('Данные успешно обновлены!');
    //             },
    //             () => {
    //                 alert('Не удалось обновить данные. Повторите попытку позже.');
    //             }
    //         );
    // };

    const title = `${taskDetails.categoryName} - ${taskDetails.categoryTypeName} - ${taskDetails.id}`;

    return (
        <Grid>
            <Typography variant="h2">{title}</Typography>
            <Grid columns="auto" justifyContent="end">
                <EditTaskDetailsButton onClick={() => alert('Edit')} />
            </Grid>
            <Grid className={styles.panel} rowGap={16} columnGap={16}>
                <Grid rowGap={16} columnGap={16} columns="2.5fr 2.5fr 1.5fr 1.5fr">
                    <TaskDetailsProvider taskDetails={taskDetails} />
                    <TaskDetailsProduct taskDetails={taskDetails} />
                    <TaskDetailsQE taskDetails={taskDetails} />
                    <TaskDetailsDates taskDetails={taskDetails} />
                </Grid>
                <TaskDetailsAddCommentsForm taskDetails={taskDetails} />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsInfoSection;
