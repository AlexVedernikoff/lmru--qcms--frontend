import {useTranslation} from 'react-i18next';
import {Grid} from 'fronton-react';
import TaskCard from './TaskCard';
import AllTasks from './Illustrations/AllTasks';
import OverdueTasks from './Illustrations/OverdueTasks';
import NewTasks from './Illustrations/NewTasks';
import DocUpdates from './Illustrations/DocUpdates';
import Rejected from './Illustrations/Rejected';

const DashboardProviderRole: React.FC = () => {
    const {t} = useTranslation('dashboard');

    return (
        <Grid columns="repeat(5, auto)" gap={24}>
            <TaskCard title={t('TaskCard.AllTasks')} count={100} image={<AllTasks />} isPrimary />
            <TaskCard title={t('TaskCard.OverdueTasks')} count={100} image={<OverdueTasks />} />
            <TaskCard title={t('TaskCard.NewTasks')} count={100} image={<NewTasks />} />
            <TaskCard title={t('TaskCard.DocUpdates')} count={100} image={<DocUpdates />} />
            <TaskCard title={t('TaskCard.Rejected')} count={100} image={<Rejected />} />
        </Grid>
    );
};

export default DashboardProviderRole;
