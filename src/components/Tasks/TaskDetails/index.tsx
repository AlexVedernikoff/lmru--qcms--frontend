import {Grid} from 'fronton-react';
import TaskDetailsInfoSection from './TaskDetailsInfoSection';
import TaskTabsSection from './TaskTabsSection';
import {useParams} from 'react-router-dom';
import {taskDetailsApi} from './api';

const TaskDetails: React.FC = () => {
    const {id} = useParams();
    const {data: taskDetails} = taskDetailsApi.useGetTaskDetailsQuery(id!);

    return (
        <Grid rowGap={16}>
            {taskDetails && (
                <>
                    <TaskDetailsInfoSection taskDetails={taskDetails} />
                    <TaskTabsSection taskDetails={taskDetails} />
                </>
            )}
        </Grid>
    );
};

export default TaskDetails;
