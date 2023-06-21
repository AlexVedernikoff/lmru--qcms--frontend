import {Breadcrumbs, BreadcrumbsItem, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import ModelList from './ModelList';
import {APP_ROUTES} from '../../common/consts';

const Products: React.FC = () => {
    const {t} = useTranslation('models');
    const navigate = useNavigate();
    const {id} = useParams();

    const handleBackToTitle = () => {
        navigate(APP_ROUTES.models);
    };

    return id ? (
        <Grid rowGap={16}>
            <Breadcrumbs>
                <BreadcrumbsItem onClick={handleBackToTitle}>{t('Title')}</BreadcrumbsItem>
                <BreadcrumbsItem>{id}</BreadcrumbsItem>
            </Breadcrumbs>
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
