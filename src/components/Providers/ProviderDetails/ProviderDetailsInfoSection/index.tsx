import {Grid} from 'fronton-react';
import ProviderDetailsProfile from './ProviderDetailsProfile';
import ProviderDetailsBasic from './ProviderDetailsBasic';
import styles from '../../../Common.module.css';

const ProductDetailsInfoSection: React.FC = () => {
    return (
        <Grid className={styles.panel} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="1.5fr 1fr">
                <ProviderDetailsBasic />
                <ProviderDetailsProfile />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsInfoSection;
