import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import classes from './styles.module.css';
import {ITaskDetails} from '../../../../common/types/taskDetails';

interface Props {
    taskDetails: ITaskDetails;
}

const TaskDetailsQE: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.QE')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetails.responsible[0]?.type === 'QE' && taskDetails.responsible[0]?.type}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.SQM')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetails.approvers[0]?.type === 'SQM' && taskDetails.approvers[0]?.externalId}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.Contractor')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetails.responsible[0]?.type === 'SUPPLIER' && taskDetails.responsible[0]?.externalId}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.TypeApprover')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetails.approvers[0]?.type}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.ApproverPlatform')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'По умолчанию'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.TaskStatus')}
                </Typography>
                <br />
                <Typography className={classes.contractor} variant="s" size="body_short">
                    {taskDetails.actionStatus}
                </Typography>
            </div>
        </Grid>
    );
};

export default TaskDetailsQE;
