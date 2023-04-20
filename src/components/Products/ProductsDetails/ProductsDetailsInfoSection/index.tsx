import {Grid} from 'fronton-react';
import ProductsDetailsAttributes from './ProductsDetailsAttributes';
import ProductsDetailsDates from './ProductsDetailsDates';
import ProductsDetailsInfo from './ProductsDetailsInfo';
import ProductsDetailsProduct from './ProductsDetailsProduct';
import ProductsDetailsProvider from './ProductsDetailsProvider';
import styles from '../ProductsDetails.module.css';

const ProductsDetailsInfoSection: React.FC = () => {
    return (
        <Grid className={styles.section} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="500px 1fr">
                <ProductsDetailsProvider />
                <ProductsDetailsProduct />
            </Grid>

            <Grid rowGap={16} columnGap={16} columns="500px 1fr">
                <ProductsDetailsAttributes />

                <Grid columnGap={16} columns="1fr 1fr">
                    <ProductsDetailsDates />
                    <ProductsDetailsInfo />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductsDetailsInfoSection;
