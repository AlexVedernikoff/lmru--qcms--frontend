import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {Outlet, useParams} from 'react-router-dom';
import ModelList from './ModelList';

const Products: React.FC = () => {
    const {t} = useTranslation('models');
    const {id} = useParams();

    return id ? (
        <Grid rowGap={16}>
            <Outlet />
        </Grid>
    ) : (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <Typography variant="h2">{t('Title')}</Typography>
            </Grid>
            <Grid rowGap={16}>
                <ModelList />
            </Grid>
        </Grid>
    );
};

export default Products;
