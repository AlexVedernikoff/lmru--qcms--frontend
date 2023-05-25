import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {Outlet, useParams} from 'react-router-dom';
import TaskList from './TaskList';

const Tasks: React.FC = () => {
    const {t} = useTranslation('tasks');
    const {id} = useParams();

    return (
        <Grid rowGap={24}>
            {!id && (
                <Grid rowGap={24}>
                    <Typography variant="h2">{t('Title')}</Typography>
                    <TaskList />
                </Grid>
            )}
            <Grid rowGap={24}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default Tasks;
