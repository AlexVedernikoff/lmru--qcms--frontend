import {useTranslation} from 'react-i18next';
import {Grid, Textarea, Typography} from 'fronton-react';
import styles from './ModelDetails.module.css';

const ModelDetailsDescription: React.FC = () => {
    const {t} = useTranslation('models');

    return (
        <Grid rowGap={16} columnGap={16} columns="1fr" alignContent="start" justifyContent="start">
            <Typography variant="h3">{t('ModelDetails.Description.Title')}</Typography>
            <Textarea className={styles.description} />
        </Grid>
    );
};

export default ModelDetailsDescription;
