import {useTranslation} from 'react-i18next';
import {Grid, RegularButton, Typography} from 'fronton-react';
import EditIcon from '../../Icons/EditIcon';
import TaskDetailsInfoSection from './TaskDetailsInfoSection';
import TaskTabsSection from './TaskTabsSection';
import {useGetTaskDetailsQuery, useUpdateInfoTaskMutation} from './servicesTaskDetails';
import {ITaskDetails, ITaskUpdateInfoParams, ITaskUpdateInfoResponse} from '../../../common/types/taskDetails';
import {useEffect, useState} from 'react';
import {
    MutationDefinition,
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {useParams} from 'react-router-dom';

export type PropsTaskDetails = {
    taskDetails: ITaskDetails;
    setPost?: (value: ITaskUpdateInfoParams) => void;
    updateInfoTask?: MutationTrigger<
        MutationDefinition<
            ITaskUpdateInfoParams,
            BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
            never,
            ITaskUpdateInfoResponse,
            'taskDetailsApi'
        >
    >;
    initialValue?: ITaskUpdateInfoParams;
    post?: ITaskUpdateInfoParams;
};

const TaskDetails: React.FC = () => {
    const {t} = useTranslation('tasks');
    const {id} = useParams();
    const {data: taskDetails} = useGetTaskDetailsQuery(id!);
    const initialValue = {
        updatedBy: '',
        qualityActions: [],
    };
    const [post, setPost] = useState<ITaskUpdateInfoParams>(initialValue);
    const [updateInfoTask] = useUpdateInfoTaskMutation();
    useEffect(() => {
        const initialValue1 = {
            qualityActions: [
                {
                    id: 2,
                    actionStatus: 'DRAFT',
                    conclusion: 'string',
                    approvers: [
                        {
                            type: 'SUPPLIER',
                            externalId: 'string',
                        },
                    ],
                    responsible: [
                        {
                            type: 'SUPPLIER',
                            externalId: 'string',
                        },
                    ],
                    publicComment: 'string',
                },
            ],
            updatedBy: 'Alex',
        };
        setPost(initialValue1);
    }, [taskDetails]);

    let title = '';

    if (taskDetails) {
        title = `${taskDetails.categoryName} - ${taskDetails.categoryTypeName} - ${taskDetails.id}`;
    }

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>
            <Grid columns="3fr 170px" rows="25px">
                <br />
                <Typography variant="m" size="body_accent">
                    <RegularButton
                        onClick={() => {}}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                        style={{verticalAlign: 'middle'}}
                    >
                        <EditIcon color="none" />
                    </RegularButton>
                    {t('TaskDetails.Buttons.Edit')}
                </Typography>
            </Grid>
            {taskDetails && (
                <TaskDetailsInfoSection
                    taskDetails={taskDetails}
                    post={post}
                    setPost={setPost}
                    initialValue={initialValue}
                    updateInfoTask={updateInfoTask}
                />
            )}
            {taskDetails && <TaskTabsSection taskDetails={taskDetails} />}
        </Grid>
    );
};

export default TaskDetails;
