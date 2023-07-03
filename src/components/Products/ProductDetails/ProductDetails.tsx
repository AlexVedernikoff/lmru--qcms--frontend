import {useParams} from 'react-router-dom';
import {Grid, Typography} from 'fronton-react';
import ProductDetailsInfoSection from './ProductDetailsInfoSection';
import ProductDetailsQualityStatusSection from './ProductDetailsQstatusSection/ProductDetailsQualityStatusSection';
import ProductDetailsTabs from './ProductDetailsTabsSection/ProductDetailsTabs';
import {useGetDetailsForProductsQuery} from './productDetailsApi';
import {securityCode} from './mockProductDetails';

const ProductDetails: React.FC = () => {
    const {id: productId = ''} = useParams();

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});

    const title = details?.description;

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>
            <ProductDetailsInfoSection />
            <ProductDetailsQualityStatusSection />
            <ProductDetailsTabs />
        </Grid>
    );
};

export default ProductDetails;
