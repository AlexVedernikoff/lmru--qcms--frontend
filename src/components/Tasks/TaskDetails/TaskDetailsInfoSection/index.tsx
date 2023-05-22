import {Grid} from 'fronton-react';
import TaskDetailsProvider from './TaskDetailsProvider';
import TaskDetailsProduct from './TaskDetailsProduct';
import TaskDetailsQE from './TaskDetailsQE';
import TaskDetailsDates from './TaskDetailsDates';
import styles from '../../../Common.module.css';
import TaskDetailsComments from './TaskDetailsComments';

const ProductDetailsInfoSection: React.FC = () => {

    return (
        <Grid className={styles.panel} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="2.5fr 2.5fr 1.5fr 1.5fr">
                <TaskDetailsProvider />
                <TaskDetailsProduct />
                <TaskDetailsQE />
                <TaskDetailsDates />
            </Grid>

            <TaskDetailsComments />
        </Grid>
    );
};

export default ProductDetailsInfoSection;
