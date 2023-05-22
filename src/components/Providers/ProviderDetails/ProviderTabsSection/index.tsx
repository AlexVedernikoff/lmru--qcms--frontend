import {Grid} from 'fronton-react';
import ProviderTabs from './ProviderTabs';
import styles from '../../../Common.module.css';

const ProductDetailsInfoSection: React.FC = () => {
    return (
        <Grid className={styles.panel} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16}>
                <ProviderTabs />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsInfoSection;
