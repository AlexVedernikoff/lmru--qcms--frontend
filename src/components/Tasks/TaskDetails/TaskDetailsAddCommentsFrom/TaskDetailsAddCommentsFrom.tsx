import {Grid, RegularButton, Textarea, Typography} from 'fronton-react';
import {ITaskDetails} from '../../../../common/types/taskDetails';
import {taskDetailsApi} from '../api';
import {ChangeEvent, useState} from 'react';
import TaskDetailsCommentsList from '../TaskDetailsCommentsList';
import {notification} from 'antd';

import s from './styles.module.css';
import {EUserRole} from 'common/roles';
import {useAppSelector} from 'store';

interface Props {
    taskDetails: ITaskDetails;
}

const TaskDetailsAddCommentsForm: React.FC<Props> = ({taskDetails}) => {
    const [comment, setComment] = useState<string>('');
    const [updateTaskDetails] = taskDetailsApi.useUpdateTaskDetailsMutation();
    const [api, contextHolder] = notification.useNotification();
    const roles = useAppSelector(store => store.userStore.userData!.roles);
    const hasUserAddCommentsPermission =
        roles.includes(EUserRole.Admin) ||
        roles.includes(EUserRole.KeyUser) ||
        roles.includes(EUserRole.QE) ||
        roles.includes(EUserRole.SQM) ||
        roles.includes(EUserRole.Supplier) ||
        roles.includes(EUserRole.ServiceProvider);

    const {publicComments} = taskDetails;

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>, text: string) => {
        setComment(text);
    };

    const handleSubmit = () => {
        const comments = publicComments ? [...publicComments.map(({comment}) => comment), comment] : [comment];

        const id = parseInt(taskDetails.id, 10);

        updateTaskDetails({
            updatedBy: 'Matvey',
            qualityActions: comments.map(comment => ({
                id,
                publicComment: comment,
            })),
        })
            .unwrap()
            .then(
                () => {
                    api.open({
                        message: 'Комментарий добавлен!',
                    });
                },
                () => {
                    api.open({
                        message: 'Не удалось добавить комментарий, повторите попытку позже',
                    });
                }
            )
            .finally(() => {
                setComment('');
            });
    };

    return (
        <>
            {contextHolder}
            <Grid className={s.root} rowGap="31px">
                <Grid rowGap="18px">
                    <Typography variant="h3">Публичные комментарии</Typography>
                    <hr className={s.hr} />
                    {publicComments && <TaskDetailsCommentsList comments={publicComments} />}
                </Grid>
                <Textarea value={comment} placeholder="Добавить комментарий" onChange={handleTextAreaChange} />
                <Grid columns="auto" justifyContent="end">
                    <RegularButton disabled={!comment || !hasUserAddCommentsPermission} onClick={handleSubmit}>
                        Добавить
                    </RegularButton>
                </Grid>
            </Grid>
        </>
    );
};

export default TaskDetailsAddCommentsForm;
