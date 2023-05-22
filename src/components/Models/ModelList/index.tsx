import {Grid} from 'fronton-react';
import ModelsFilter from './Filter';
import ModelsTable from './Table';
import styles from '../../Common.module.css';

const ModelList: React.FC = () => {
    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ModelsFilter />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <ModelsTable />
            </Grid>
        </Grid>
    );
};

export default ModelList;
