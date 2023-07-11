import {Grid} from 'fronton-react';
import ProvidersFilter from './Filter';
import ProvidersTable from './Table';
import styles from '../../Common.module.css';

const ProvidersList: React.FC = () => {
    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ProvidersFilter />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <ProvidersTable />
            </Grid>
        </Grid>
    );
};

export default ProvidersList;
