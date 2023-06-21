import {Grid} from 'fronton-react';
import TaskDetailsProvider from './TaskDetailsProvider';
import TaskDetailsProduct from './TaskDetailsProduct';
import TaskDetailsQE from './TaskDetailsQE';
import TaskDetailsDates from './TaskDetailsDates';
import styles from '../../../Common.module.css';
import TaskDetailsComments from './TaskDetailsComments';
import {PropsTaskDetails} from '../TaskDetails';

const ProductDetailsInfoSection: React.FC<Required<PropsTaskDetails>> = props => {
    const {taskDetails, post, setPost, initialValue, updateInfoTask} = props;

    return (
        <Grid className={styles.panel} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="2.5fr 2.5fr 1.5fr 1.5fr">
                <TaskDetailsProvider taskDetails={taskDetails} />
                <TaskDetailsProduct taskDetails={taskDetails} />
                <TaskDetailsQE taskDetails={taskDetails} />
                <TaskDetailsDates taskDetails={taskDetails} />
            </Grid>

            <TaskDetailsComments
                updateInfoTask={updateInfoTask}
                post={post}
                setPost={setPost}
                taskDetails={taskDetails}
                initialValue={initialValue}
            />
        </Grid>
    );
};

export default ProductDetailsInfoSection;
