import {Grid} from 'fronton-react';
import {ITaskDetails} from '../../../../../common/types/taskDetails';
import TaskDetailsProvider from './TaskDetailsProvider';
import TaskDetailsProduct from './TaskDetailsProduct';
import TaskDetailsDates from './TaskDetailsDates';
import TaskDetailsQE from './TaskDetailsQE';

interface Props {
    taskDetails: ITaskDetails;
}

const TaskDetailsInfoSectionViewMode: React.FC<Props> = ({taskDetails}) => {
    return (
        <Grid gap="16px" columns="2.5fr 2.5fr 1.5fr 1.5fr">
            <TaskDetailsProvider taskDetails={taskDetails} />
            <TaskDetailsProduct taskDetails={taskDetails} />
            <TaskDetailsQE taskDetails={taskDetails} />
            <TaskDetailsDates taskDetails={taskDetails} />
        </Grid>
    );
};

export default TaskDetailsInfoSectionViewMode;
