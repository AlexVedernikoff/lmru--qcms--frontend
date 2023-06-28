import {CardTodo} from './CardTodo';
import {useTranslation} from 'react-i18next';
import TaskCard from './TaskCard';
import AllTasks from './Illustrations/AllTasks';
import {Grid} from 'fronton-react';
import AllTasksIcon from '../Icons/AllTasksIcon';
import {usePostSearchQualityActionsQuery} from '../../api/postSearchQualityActions';
import {USER_EXTERNAL_ID} from '../../common/mocks';
import get from 'lodash/get';
import {useKeyUserItems} from './hooks/useKeyUserItems';

export const DashboardKeyUser = () => {
    const {t} = useTranslation('dashboard');

    const {
        data: allTasksData = {pageable: {totalElements: 0}},
        isLoading: isAllTasksLoading,
        isError: isAllTasksError,
    } = usePostSearchQualityActionsQuery({
        searchBy: {
            responsible: [
                {
                    externalId: USER_EXTERNAL_ID,
                },
            ],
        },
    });

    const {items} = useKeyUserItems();

    return (
        <Grid columns="repeat(5, auto)" gap={24}>
            <TaskCard
                title={t('TaskCard.AllTasks')}
                count={get(allTasksData, 'pageable.totalElements', 0)}
                image={<AllTasks />}
                icon={<AllTasksIcon />}
                isPrimary
                isLoading={isAllTasksLoading}
                isError={isAllTasksError}
            />
            <CardTodo items={items} />
        </Grid>
    );
};
