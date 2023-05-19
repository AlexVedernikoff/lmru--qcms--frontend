import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';

const TaskDetailsDates: React.FC = () => {
    const {t} = useTranslation('tasks');

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsDates.DateCreation')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'01.12.2022'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsDates.DateChange')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'01.22.2023'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsDates.ExpectedCompletionDate')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'11.02.2024'}
                </Typography>
            </div>
        </Grid>
    );
};

export default TaskDetailsDates;
