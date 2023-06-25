import {Grid, IconButton, RegularButton, Textarea, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from './styles.module.css';
import {PropsTaskDetails} from '../TaskDetails';
import {ChangeEvent} from 'react';
import {useState} from 'react';

const TaskDetailsComments: React.FC<Required<PropsTaskDetails>> = props => {
    const {t} = useTranslation('tasks');
    const {setPost, updateInfoTask, initialValue, post} = props;
    const [text, setText] = useState('');

    const updateInfo = async () => {
        if (post.qualityActions[0].actionStatus === 'AWAITING_DOCUMENT_LOADING') {
            post.qualityActions[0].actionStatus = 'AWAITING_RESOLUTION';
        } else if (post.qualityActions[0].actionStatus === 'RETURNED_AWAITING_DOCUMENT_LOADING') {
            post.qualityActions[0].actionStatus = 'RETURNED_AWAITING_RESOLUTION';
        } else {
            delete post.qualityActions[0].actionStatus;
        }
        try {
            await updateInfoTask({
                ...post,
            }).unwrap();
            setPost(initialValue);
        } catch {
            // console.log('ERROR');
        }
    };

    return (
        <>
            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Typography variant="h3">{t('TaskDetails.DetailsComments.PublicComments')}</Typography>
                <div className={styles.containerComments}>
                    <Textarea
                        value={text}
                        placeholder={t('TaskDetails.DetailsComments.Comments')}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setText(e.target.value);
                            post.qualityActions[0].publicComments = [{comment: e.target.value.trim(), createdBy: 'w'}]; //скорее всего перезатрет
                        }}
                    />
                    <IconButton
                        aria-label=""
                        className={styles.closeBtn}
                        onClick={() => {
                            setText('');
                        }}
                        size="m"
                        variant="primary"
                    />
                </div>
            </Grid>
            <Grid rowGap={16} columnGap={16} columns="4fr 200px">
                <br />
                <RegularButton
                    onClick={() => {
                        updateInfo();
                    }}
                    disabled={!text}
                    size="m"
                    variant="primary"
                >
                    {t('TaskDetails.Buttons.SubmitReview')}
                </RegularButton>
            </Grid>
        </>
    );
};

export default TaskDetailsComments;
