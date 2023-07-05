import {Grid, RegularButton, Textarea, Typography} from 'fronton-react';
import {ITaskDetails} from '../../../../common/types/taskDetails';
import {taskDetailsApi} from '../api';
import {ChangeEvent, useState} from 'react';
import TaskDetailsCommentsList from '../TaskDetailsCommentsList';
import {notification} from 'antd';

import s from './styles.module.css';

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
