import {useTranslation} from 'react-i18next';
import {Grid} from 'fronton-react';
import TaskCard from './TaskCard';
import AllTasks from './Illustrations/AllTasks';
import NewTasks from './Illustrations/NewTasks';

const DashboardServiceProviderRole: React.FC = () => {
    const {t} = useTranslation('dashboard');

    return (
        <Grid columns="repeat(5, auto)" gap={24}>
            <TaskCard title={t('TaskCard.AllTasks')} count={100} image={<AllTasks />} isPrimary />
            <TaskCard title={t('TaskCard.NewTasks')} count={100} image={<NewTasks />} />
            <TaskCard title={t('TaskCard.ReCheck')} count={10} />
        </Grid>
    );
};

export default DashboardServiceProviderRole;
