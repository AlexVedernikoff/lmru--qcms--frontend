import {Grid, Typography} from 'fronton-react';
import ProductsFilter from './ProductsFilter/ProductsFilter';
import ProductsTable from './ProductsTable/ProductsTable';
// import styles from './Products.module.css';

const Products: React.FC = () => {
    return (
        <Grid rowGap={16}>
            <Typography variant="h2">Товары</Typography>
            <ProductsFilter />
            <ProductsTable />
        </Grid>
    );
};

export default Products;
