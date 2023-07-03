import {useParams} from 'react-router-dom';
import {Grid, Typography} from 'fronton-react';
import ProductDetailsInfoSection from './ProductDetailsInfoSection';
import ProductDetailsQualityStatusSection from './ProductDetailsQstatusSection/ProductDetailsQualityStatusSection';
import ProductDetailsTabs from './ProductDetailsTabsSection/ProductDetailsTabs';

const ProductDetails: React.FC = () => {
    const {id = ''} = useParams();

    const title = id;

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
