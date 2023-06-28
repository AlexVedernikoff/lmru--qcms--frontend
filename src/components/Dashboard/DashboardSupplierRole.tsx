import {useTranslation} from 'react-i18next';
import {Grid} from 'fronton-react';
import TaskCard from './TaskCard';
import AllTasks from './Illustrations/AllTasks';
import OverdueTasks from './Illustrations/OverdueTasks';
import NewTasks from './Illustrations/NewTasks';
import DocUpdates from './Illustrations/DocUpdates';
import Rejected from './Illustrations/Rejected';
import {usePostSearchQualityActionsQuery} from '../../api/postSearchQualityActions';
import {USER_EXTERNAL_ID} from '../../common/mocks';
import get from 'lodash/get';
import {usePostQSearchQualityDocsQuery} from '../../api/postSearchQualityDocuments';

const baseQualityActionsResponsible = [
    {
        type: 'SUPPLIER',
        externalId: USER_EXTERNAL_ID,
    },
];
const currentDate = new Date();

const DashboardSupplierRole: React.FC = () => {
    const {t} = useTranslation('dashboard');
    const {
        data: allTasksData = {pageable: {totalElements: 0}},
        isLoading: isAllTasksLoading,
        isError: isAllTasksError,
    } = usePostSearchQualityActionsQuery({
        searchBy: {responsible: baseQualityActionsResponsible},
    });

    // !этот запрос нужно будет исправить в будущем (он будет без дат)
    const {
        data: overdueTasksData = {pageable: {totalElements: 0}},
        isLoading: isOverdueTasksLoading,
        isError: isOverdueTasksError,
    } = usePostSearchQualityActionsQuery({
        searchBy: {
            responsible: baseQualityActionsResponsible,
            actionStatuses: ['AWAITING_DOCUMENT_LOADING', 'AWAITING_RESOLUTION'],
            dates: {
                dateType: 'REALISATIONDUE_DATE',
                startDate: currentDate.toISOString(),
                endDate: currentDate.toISOString(),
            },
        },
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
        data: docUpdatesData = {pageable: {totalElements: 0}},
        isLoading: isDocUpdatesLoading,
        isError: isDocUpdatesError,
    } = usePostQSearchQualityDocsQuery({
        pageIndex: 0,
        pageSize: 20,
        searchBy: {
            status: ['IN_RENEWAL'],
        },
    });

    const {
        data: rejectedTasksData = {pageable: {totalElements: 0}},
        isLoading: isRejectedTasksLoading,
        isError: isRejectedTasksError,
    } = usePostSearchQualityActionsQuery({
        searchBy: {
            responsible: baseQualityActionsResponsible,
            actionStatuses: ['СANCELLED'],
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
                title={t('TaskCard.OverdueTasks')}
                count={get(overdueTasksData, 'pageable.totalElements', 0)}
                image={<OverdueTasks />}
                isLoading={isOverdueTasksLoading}
                isError={isOverdueTasksError}
            />
            <TaskCard
                title={t('TaskCard.NewTasks')}
                count={get(newTasksData, 'pageable.totalElements', 0)}
                image={<NewTasks />}
                isLoading={isNewTasksLoading}
                isError={isNewTasksError}
            />
            <TaskCard
                title={t('TaskCard.DocUpdates')}
                count={get(docUpdatesData, 'pageable.totalElements', 0)}
                image={<DocUpdates />}
                isLoading={isDocUpdatesLoading}
                isError={isDocUpdatesError}
            />
            <TaskCard
                title={t('TaskCard.Rejected')}
                count={get(rejectedTasksData, 'pageable.totalElements', 0)}
                image={<Rejected />}
                isLoading={isRejectedTasksLoading}
                isError={isRejectedTasksError}
            />
        </Grid>
    );
};

export default DashboardSupplierRole;
