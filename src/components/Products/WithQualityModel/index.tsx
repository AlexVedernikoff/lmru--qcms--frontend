import {Grid} from 'fronton-react';
import ProductsFilter from './ProductsFilter';
import ProductsTable from './ProductsTable';
import styles from '../../Common.module.css';

const ProductsWithQualityModel: React.FC = () => {
    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ProductsFilter />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <ProductsTable />
            </Grid>
        </Grid>
    );
};

export default ProductsWithQualityModel;
