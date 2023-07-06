import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {ITaskDetails} from '../../../../../common/types/taskDetails';

import styles from '../../../../Common.module.css';
import s from './styles.module.css';

interface Props {
    taskDetails: ITaskDetails;
}

const TaskDetailsQE: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');

    const taskDetailsResponsibleType = taskDetails.responsible[0]?.type;
    const taskDetailsApproversType = taskDetails.approvers[0]?.type;
    const taskDetailsApproversExternalId = taskDetails.approvers[0]?.externalId;
    const taskDetailsResponsibleExternalId = taskDetails.responsible[0]?.externalId;

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.QE')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetailsResponsibleType === 'QE' && 'QE'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.SQM')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetailsApproversType === 'SQM' && taskDetailsApproversExternalId}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.Contractor')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetailsResponsibleType === 'SUPPLIER' && taskDetailsResponsibleExternalId}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('TaskDetails.DetailsQE.TypeApprover')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {taskDetailsApproversType}
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
                <Typography className={s.contractor} variant="s" size="body_short">
                    {taskDetails.actionStatus}
                </Typography>
            </div>
        </Grid>
    );
};

export default TaskDetailsQE;
