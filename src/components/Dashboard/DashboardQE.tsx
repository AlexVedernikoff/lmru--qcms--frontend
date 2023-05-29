import {CardTodo} from '../Common/CardTodo';
import {FlagIcon} from '@fronton/icons-react';
import {useTranslation} from 'react-i18next';
import {IItemListTodo} from '../../common/models';
import {Grid} from 'fronton-react';
import AllTasks from './Illustrations/AllTasks';
import TaskCard from './TaskCard';
import AllTasksIcon from '../Icons/AllTasksIcon';

export const DashboardQE = () => {
    const {t} = useTranslation('dashboard');

    const items: IItemListTodo[] = [
        {
            icon: FlagIcon,
            label: t('List.ReChecking'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.QualifyingTasksLaunch'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.CertificationTasksLaunch'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.TransferDocuments'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.TasksAwaitingValidation'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.ProductsWithErrors'),
            valueImportant: 2,
            value: 4,
        },
    ];

    return (
        <Grid columns="repeat(5, auto)" gap={24}>
            <TaskCard
                title={t('TaskCard.AllTasks')}
                count={100}
                image={<AllTasks />}
                icon={<AllTasksIcon />}
                isPrimary
            />
            <CardTodo items={items} />
        </Grid>
    );
};
