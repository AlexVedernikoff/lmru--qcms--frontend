import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import AwaitedDocumentsTable from './AwaitedDocumentsTable';
import UploadedDocumentsTable from './UploadedDocumentsTable';
import commonStyles from '../../../../Common.module.css';
import {ITaskDetails} from '../../../../../common/types/taskDetails';

interface Props {
    taskDetails: ITaskDetails;
}

const TaskTabDocuments: React.FC<Props> = ({taskDetails}) => {
    const {t} = useTranslation('tasks');

    return (
        <Grid gap={16}>
            <Grid className={commonStyles.sectionItem} rowGap={24}>
                <Typography variant="m" size="body_accent">
                    {t('TaskTabs.Documents.AwaitedDocuments.Title')}
                </Typography>
                <AwaitedDocumentsTable taskDetails={taskDetails} />
            </Grid>

            <Grid className={commonStyles.sectionItem} rowGap={24}>
                <Typography variant="m" size="body_accent">
                    {t('TaskTabs.Documents.UploadedDocuments.Title')}
                </Typography>
                <UploadedDocumentsTable taskDetails={taskDetails} />
            </Grid>
        </Grid>
    );
};

export default TaskTabDocuments;
