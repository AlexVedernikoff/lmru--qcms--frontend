import {CardTodo} from './CardTodo';
import {useTranslation} from 'react-i18next';
import {Grid} from 'fronton-react';
import AllTasks from './Illustrations/AllTasks';
import TaskCard from './TaskCard';
import AllTasksIcon from '../Icons/AllTasksIcon';
import {usePostSearchQualityActionsQuery} from '../../api/postSearchQualityActions';
import {USER_EXTERNAL_ID} from '../../common/mocks';
import {useQEorSQMItems} from './hooks/useQEorSQMItems';
import get from 'lodash/get';
import {EUserRole} from '../../common/roles';

interface IProps {
    userRole: EUserRole;
}

export const DashboardQEorSQM: React.FC<IProps> = ({userRole}) => {
    const {t} = useTranslation('dashboard');

    const {
        data: allTasksData = {pageable: {totalElements: 0}},
        isLoading: isAllTasksLoading,
        isError: isAllTasksError,
    } = usePostSearchQualityActionsQuery({
        searchBy: {
            responsible: [
                {
                    type: userRole,
                    externalId: USER_EXTERNAL_ID,
                },
            ],
        },
    });

    const {items} = useQEorSQMItems({userRole});

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
