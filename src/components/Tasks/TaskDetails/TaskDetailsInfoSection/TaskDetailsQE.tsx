import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import classes from './styles.module.css';
import {PropsTaskDetails} from '../TaskDetails';

const TaskDetailsQE: React.FC<PropsTaskDetails> = props => {
    const {t} = useTranslation('tasks');
    const {taskDetails} = props;
    //TODO уточнить одно из трех полей отображается или все три сразу? Лейла обещала ответить позже
    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            {taskDetails.responsible[0].type === 'QE' && (
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('TaskDetails.DetailsQE.QE')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {taskDetails.responsible[0].type}
                    </Typography>
                </div>
            )}

            {/* <br /> */}

            {taskDetails.responsible[0].type === 'SQM' && (
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('TaskDetails.DetailsQE.SQM')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {taskDetails.approvers[0].externalId}
                    </Typography>
                </div>
            )}

            {/* <br /> */}

            {taskDetails.responsible[0].type === 'SUPPLIER' && (
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('TaskDetails.DetailsQE.Contractor')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {taskDetails.responsible[0].externalId}
                    </Typography>
                </div>
            )}

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.TypeApprover')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetails.approvers[0].type}
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
