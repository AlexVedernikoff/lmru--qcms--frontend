import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import AwaitedDocumentsTable from './AwaitedDocumentsTable';
import UploadedDocumentsTable from './UploadedDocumentsTable';
import commonStyles from '../../../../Common.module.css';

const TaskTabDocuments: React.FC = () => {
    const {t} = useTranslation('tasks');

    return (
        <Grid gap={16}>
            <Grid className={commonStyles.sectionItem} rowGap={24}>
                <Typography variant="m" size="body_accent">
                    {t('TaskTabs.Documents.AwaitedDocuments.Title')}
                </Typography>
                <AwaitedDocumentsTable />
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
