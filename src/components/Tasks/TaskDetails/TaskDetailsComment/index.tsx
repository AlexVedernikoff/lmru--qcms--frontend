import {Grid} from 'fronton-react';
import {ITaskDetailsPublicComment} from '../../../../common/types/taskDetails';

import s from './styles.module.css';
import {convertDateFromServer} from '../../../../utils/convertDateFromServer';

interface Props {
    comment: ITaskDetailsPublicComment;
}

const TaskDetailsComment: React.FC<Props> = ({comment}) => {
    return (
        <Grid columns="auto" justifyContent="left">
            <Grid className={s.container} columnGap="18px" columns="auto auto">
                {comment.createdBy && <div className={s.ava}>{comment.createdBy[0]}</div>}
                <Grid rowGap="8px">
                    <Grid columns="auto auto" columnGap="17px">
                        <span className={s.createdBy}>{comment.createdBy}</span>
                        <span className={s.createdAt}>{convertDateFromServer(comment.createdAt)}</span>
                    </Grid>
                    <span className={s.comment}>{comment.comment}</span>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TaskDetailsComment;
