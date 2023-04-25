import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import ProductsFilter from './ProductsFilter/ProductsFilter';
import ProductsTable from './ProductsTable/ProductsTable';
import styles from '../Products.module.css';

const ProductsWithQualityModel: React.FC = () => {
    const {t} = useTranslation('products');

    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <Typography variant="h2">{t('Title')}</Typography>
                <ProductsFilter />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <ProductsTable />
            </Grid>
        </Grid>
    );
};

export default ProductsWithQualityModel;
