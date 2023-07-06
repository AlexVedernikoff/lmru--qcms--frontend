import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {ITaskDetails} from '../../../../../common/types/taskDetails';
import {convertDateFromServer} from '../../../../../utils/convertDateFromServer';

import styles from '../../../../Common.module.css';

interface Props {
    taskDetails: ITaskDetails;
}

const TaskDetailsDates: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsDates.DateCreation')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {convertDateFromServer(taskDetails.creationInformation.createdAt)}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsDates.DateChange')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {convertDateFromServer(taskDetails.lastUpdateInformation.updatedAt)}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsDates.ExpectedCompletionDate')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {convertDateFromServer(taskDetails.realisationDueDate)}
                </Typography>
            </div>
        </Grid>
    );
};

export default TaskDetailsDates;
