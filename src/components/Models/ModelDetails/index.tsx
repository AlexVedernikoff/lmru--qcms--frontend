import {useParams} from 'react-router-dom';
import {Grid, Typography} from 'fronton-react';
import ProductDetailsInfoSection from './ProductDetailsInfoSection';
import ProductDetailsQualityStatusSection from './ProductDetailsQualityStatusSection';

const ModelDetails: React.FC = () => {
    const {id} = useParams();

    const title = `WEBER.TON MICRO V 0000 25 KG - ${id} - Леруа Мерлен Россия`;

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>
            <ProductDetailsInfoSection />
            <ProductDetailsQualityStatusSection />
        </Grid>
    );
};

export default ModelDetails;
