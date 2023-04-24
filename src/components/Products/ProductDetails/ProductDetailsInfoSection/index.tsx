import {Grid} from 'fronton-react';
import ProductDetailsAttributes from './ProductDetailsAttributes';
import ProductDetailsDates from './ProductDetailsDates';
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductDetailsProduct from './ProductDetailsProduct';
import ProductDetailsProvider from './ProductDetailsProvider';
import styles from '../ProductDetails.module.css';

const ProductDetailsInfoSection: React.FC = () => {
    return (
        <Grid className={styles.section} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="500px 1fr">
                <ProductDetailsProvider />
                <ProductDetailsProduct />
            </Grid>

            <Grid rowGap={16} columnGap={16} columns="500px 1fr">
                <ProductDetailsAttributes />

                <Grid columnGap={16} columns="1fr 1fr">
                    <ProductDetailsDates />
                    <ProductDetailsInfo />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductDetailsInfoSection;
