import {useTranslation} from 'react-i18next';
import {Grid, RegularButton, Typography} from 'fronton-react';
import EditIcon from '../../Icons/EditIcon';
import TaskDetailsInfoSection from './TaskDetailsInfoSection';
import TaskTabsSection from './TaskTabsSection';

const TaskDetails: React.FC = () => {
    const title = `Сертификация - Сбор документов - Сбор документов - 10230358109883`;
    const {t} = useTranslation('tasks');

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>
            <Grid columns="3fr 170px" rows="25px">
                <br />
                <Typography variant="m" size="body_accent">
                    <RegularButton
                        onClick={() => {}}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                        style={{verticalAlign: 'middle'}}
                    >
                        <EditIcon color="none" />
                    </RegularButton>
                    {t('TaskDetails.Buttons.Edit')}
                </Typography>
            </Grid>
            <TaskDetailsInfoSection />
            <TaskTabsSection />
        </Grid>
    );
};

export default TaskDetails;
