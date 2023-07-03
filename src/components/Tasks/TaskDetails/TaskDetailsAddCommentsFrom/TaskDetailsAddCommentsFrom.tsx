import {Grid, RegularButton, Textarea, Typography} from 'fronton-react';
import {ITaskDetails, ITaskUpdateInfoParamsComment} from '../../../../common/types/taskDetails';
import {taskDetailsApi} from '../api';
import {ChangeEvent, useState} from 'react';
import TaskDetailsCommentsList from '../TaskDetailsCommentsList';

import s from './styles.module.css';
import {notification} from 'antd';

interface Props {
    taskDetails: ITaskDetails;
}

const TaskDetailsAddCommentsForm: React.FC<Props> = ({taskDetails}) => {
    const [comment, setComment] = useState<string>('');
    const [updateTaskDetails] = taskDetailsApi.useUpdateTaskDetailsMutation();
    const [api, contextHolder] = notification.useNotification();

    const {publicComments} = taskDetails;

    const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>, text: string) => {
        setComment(text);
    };

    const handleSubmit = () => {
        const prevComments: ITaskUpdateInfoParamsComment[] = publicComments
            ? publicComments.map(({createdBy, comment}) => ({createdBy, comment}))
            : [];
        const newComment: ITaskUpdateInfoParamsComment = {
            createdBy: 'Matvey',
            comment,
        };
        const newComments: ITaskUpdateInfoParamsComment[] = [...prevComments, newComment];

        updateTaskDetails({
            updatedBy: 'Matvey',
            qualityActions: [
                {
                    id: parseInt(taskDetails.id, 10),
                    publicComments: newComments,
                    actionStatus: 'DRAFT',
                },
            ],
        })
            .unwrap()
            .then(
                () => {
                    api.open({
                        message: 'Запрос успешно отправлен!',
                    });
                },
                () => {
                    api.open({
                        message: 'Не удалось отправить запрос, повторите попытку позже',
                    });
                }
            );
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
                    <RegularButton disabled={!comment} onClick={handleSubmit}>
                        Добавить
                    </RegularButton>
                </Grid>
            </Grid>
        </>
    );
};

export default TaskDetailsAddCommentsForm;
