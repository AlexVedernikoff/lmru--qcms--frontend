import {Grid} from 'fronton-react';
import TaskTabs from './TaskTabs';
import styles from '../../../Common.module.css';

const TaskTabsSection: React.FC = () => {
    return (
        <Grid className={styles.panel} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16}>
                <TaskTabs />
            </Grid>
        </Grid>
    );
};

export default TaskTabsSection;
