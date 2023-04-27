import {Grid} from 'fronton-react';
import ProductsFilter from './ProductsFilter';
import ProductsTable from './ProductsTable';
import productsStyles from '../Products.module.css';

const ProductsWithQualityModel: React.FC = () => {
    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ProductsFilter />
            </Grid>

            <Grid rowGap={16} className={productsStyles.panel}>
                <ProductsTable />
            </Grid>
        </Grid>
    );
};

export default ProductsWithQualityModel;
