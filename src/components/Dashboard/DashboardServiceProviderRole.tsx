import {useTranslation} from 'react-i18next';
import {Grid} from 'fronton-react';
import TaskCard from './TaskCard';
import AllTasks from './Illustrations/AllTasks';
import NewTasks from './Illustrations/NewTasks';
import {USER_EXTERNAL_ID} from '../../common/mocks';
import get from 'lodash/get';
import {usePostSearchQualityActionsQuery} from '../../api/postSearchQualityActions';

const baseQualityActionsResponsible = [
    {
        type: 'SERVICE_PROVIDER',
        externalId: USER_EXTERNAL_ID,
    },
];

const DashboardServiceProviderRole: React.FC = () => {
    const {t} = useTranslation('dashboard');
    const {
        data: allTasksData = {pageable: {totalElements: 0}},
        isLoading: isAllTasksLoading,
        isError: isAllTasksError,
    } = usePostSearchQualityActionsQuery({
        searchBy: {responsible: baseQualityActionsResponsible},
    });

    const {
        data: newTasksData = {pageable: {totalElements: 0}},
        isLoading: isNewTasksLoading,
        isError: isNewTasksError,
    } = usePostSearchQualityActionsQuery({
        searchBy: {
            responsible: baseQualityActionsResponsible,
            actionStatuses: ['AWAITING_DOCUMENT_LOADING'],
        },
    });

    const {
        data: reCheckData = {pageable: {totalElements: 0}},
        isLoading: isReCheckLoading,
        isError: isReCheckError,
    } = usePostSearchQualityActionsQuery({
        searchBy: {
            responsible: baseQualityActionsResponsible,
            actionStatuses: ['RETURNED_AWAITING_DOCUMENT_LOADING', 'RETURNED_AWAITING_RESOLUTION'],
        },
    });

    return (
        <Grid columns="repeat(5, auto)" gap={24}>
            <TaskCard
                title={t('TaskCard.AllTasks')}
                count={get(allTasksData, 'pageable.totalElements', 0)}
                image={<AllTasks />}
                isPrimary
                isLoading={isAllTasksLoading}
                isError={isAllTasksError}
            />
            <TaskCard
                title={t('TaskCard.NewTasks')}
                count={get(newTasksData, 'pageable.totalElements', 0)}
                image={<NewTasks />}
                isLoading={isNewTasksLoading}
                isError={isNewTasksError}
            />
            <TaskCard
                title={t('TaskCard.ReCheck')}
                count={get(reCheckData, 'pageable.totalElements', 0)}
                isLoading={isReCheckLoading}
                isError={isReCheckError}
            />
        </Grid>
    );
};

export default DashboardServiceProviderRole;
