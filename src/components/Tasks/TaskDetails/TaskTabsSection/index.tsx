import {Grid} from 'fronton-react';
import TaskTabs from './TaskTabs';
import styles from '../../../Common.module.css';
import TaskActionsForm from '../TaskActionsForm';
import {ITaskDetails} from '../../../../common/types/taskDetails';

interface Props {
    taskDetails: ITaskDetails;
}

const TaskTabsSection: React.FC<Props> = ({taskDetails}) => {
    return (
        <Grid className={styles.panel} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16}>
                <TaskActionsForm taskDetails={taskDetails} />
                <TaskTabs taskDetails={taskDetails} />
            </Grid>
        </Grid>
    );
};

export default TaskTabsSection;
