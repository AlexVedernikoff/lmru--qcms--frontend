// import {useParams} from 'react-router-dom';
import {Grid, Typography} from 'fronton-react';
import ProductDetailsInfoSection from './ProductDetailsInfoSection';
import ProductDetailsQualityStatusSection from './ProductDetailsQualityStatusSection';

import productDetailsApi from './productDetailsApi';

const ProductDetails: React.FC = () => {
    // const {id = ''} = useParams();

    const id = '2';

    const title = `WEBER.TON MICRO V 0000 25 KG - ${id} - Леруа Мерлен Россия`;

    const {data} = productDetailsApi.useGetDetailsForProductsQuery({id, securityCode: 'security_code'});

    console.log('data', data);

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>
            <ProductDetailsInfoSection />
            <ProductDetailsQualityStatusSection />
        </Grid>
    );
};

export default ProductDetails;
