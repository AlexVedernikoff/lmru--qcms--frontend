import {Grid, Typography} from 'fronton-react';
import ProductsDetailsInfoSection from './ProductsDetailsInfoSection';
import ProductsDetailsQualityStatusSection from './ProductsDetailsQualityStatusSection';

const title = 'WEBER.TON MICRO V 0000 25 KG - 87334230 - Леруа Мерлен Россия';

const ProductsDetails: React.FC = () => {
    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>
            <ProductsDetailsInfoSection />
            <ProductsDetailsQualityStatusSection />
        </Grid>
    );
};

export default ProductsDetails;
