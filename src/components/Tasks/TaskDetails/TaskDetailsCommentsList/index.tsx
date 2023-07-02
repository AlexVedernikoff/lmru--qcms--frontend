import {Grid} from 'fronton-react';
import {ITaskDetailsPublicComment} from '../../../../common/types/taskDetails';
import TaskDetailsComment from '../TaskDetailsComment';
import {useMemo} from 'react';

interface Props {
    comments: ITaskDetailsPublicComment[];
}

const TaskDetailsCommentsList: React.FC<Props> = ({comments}) => {
    const sortedComments = useMemo(
        () => [...comments].sort((comment1, comment2) => comment1.order - comment2.order),
        [comments]
    );

    return (
        <Grid rowGap="18px">
            {sortedComments.map(comment => (
                <TaskDetailsComment key={comment.id} comment={comment} />
            ))}
        </Grid>
    );
};

export default TaskDetailsCommentsList;
