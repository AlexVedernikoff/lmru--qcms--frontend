import {Grid, Typography, RadioGroup, Radio} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import Models from '../../Icons/Models';
import productsStyles from '../Products.module.css';
import ProductsFilter from './ProductsFilter';
import ProductsTable from './ProductsTable';

const ProductsWithoutQualityModel: React.FC = () => {
    const {t} = useTranslation('products');

    return (
        <Grid rowGap={16}>
            <ProductsFilter />

            <Grid rowGap={16} className={productsStyles.panel}>
                <Typography variant="h3">
                    {'11_Краски Подготовка основания Грунтовка стен и аксессуары Шпаклевка'}
                </Typography>

                <Grid rowGap={4}>
                    <Grid columns="24px 1fr" columnGap="12px">
                        <Models color="black" />

                        <Typography variant="l" size="body_long">
                            {t('WithoutModels.Table.SelectModel')}
                        </Typography>
                    </Grid>

                    <RadioGroup name="group" onChange={() => {}} value={null}>
                        <Radio label="Coat in powder Form" value="1" />
                        <Radio label="Шпатлевка в виде пасты и порошка" value="2" />
                    </RadioGroup>
                </Grid>

                <ProductsTable />
            </Grid>
        </Grid>
    );
};

export default ProductsWithoutQualityModel;
