import {Grid, IconButton, RegularButton, Textarea, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import CloseIcon from '../../../Icons/CloseIcon';
import styles from './styles.module.css'

const TaskDetailsComments: React.FC = () => {
    const {t} = useTranslation('tasks');

    return (
        <>
            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Typography variant="h3">{t('TaskDetails.DetailsComments.PublicComments')}</Typography>
                <div className={styles.containerComments}>
                    <Textarea placeholder={t('TaskDetails.DetailsComments.Comments')} />
                    <IconButton aria-label="" className={styles.closeBtn} onClick={() => {}} size="m" variant="primary">
                        <CloseIcon />
                    </IconButton>
                </div>
            </Grid>
            <Grid rowGap={16} columnGap={16} columns="4fr 200px">
                <br />
                <RegularButton onClick={() => {}} size="m" variant="primary">
                    {t('TaskDetails.Buttons.SubmitReview')}
                </RegularButton>
            </Grid>
        </>
    );
};

export default TaskDetailsComments;
