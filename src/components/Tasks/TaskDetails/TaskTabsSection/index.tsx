import {Grid} from 'fronton-react';
import TaskTabs from './TaskTabs';
import styles from '../../../Common.module.css';
import {PropsTaskDetails} from '../TaskDetails';
import TaskActionsForm from '../TaskActionsForm';

const TaskTabsSection: React.FC<PropsTaskDetails> = props => {
    const {taskDetails} = props;

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
