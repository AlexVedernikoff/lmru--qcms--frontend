import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import AwaitingDocumentsTable from './AwaitingDocumentsTable';
import UploadedDocumentsTable from './UploadedDocumentsTable';
import commonStyles from '../../../../Common.module.css';

const TaskTabDocuments: React.FC = () => {
    const {t} = useTranslation('tasks');

    return (
        <Grid gap={16}>
            <Grid className={commonStyles.sectionItem} rowGap={24}>
                <Typography variant="m" size="body_accent">
                    {t('TaskTabs.Documents.AwaitingDocuments.Title')}
                </Typography>
                <AwaitingDocumentsTable />
            </Grid>

            <Grid className={commonStyles.sectionItem} rowGap={24}>
                <Typography variant="m" size="body_accent">
                    {t('TaskTabs.Documents.UploadedDocuments.Title')}
                </Typography>
                <UploadedDocumentsTable />
            </Grid>
        </Grid>
    );
};

export default TaskTabDocuments;
