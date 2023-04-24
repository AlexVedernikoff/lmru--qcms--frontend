import {Grid, Typography} from 'fronton-react';
import ProductDetailsInfoSection from './ProductDetailsInfoSection';
import ProductDetailsQualityStatusSection from './ProductDetailsQualityStatusSection';

const title = 'WEBER.TON MICRO V 0000 25 KG - 87334230 - Леруа Мерлен Россия';

const ProductDetails: React.FC = () => {
    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>
            <ProductDetailsInfoSection />
            <ProductDetailsQualityStatusSection />
        </Grid>
    );
};

export default ProductDetails;
