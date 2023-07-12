import {Breadcrumbs, BreadcrumbsItem, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import TaskList from './TaskList';
import {RoutePath} from 'common/routes';

const Tasks: React.FC = () => {
    const {t} = useTranslation('tasks');
    const navigate = useNavigate();
    const {id} = useParams();

    const handleBackToTitle = () => {
        navigate(RoutePath.Tasks);
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
        <Grid rowGap={24}>
            <Grid rowGap={24}>
                <Typography variant="h2">{t('Title')}</Typography>
                <TaskList />
            </Grid>
        </Grid>
    );
};

export default Tasks;
