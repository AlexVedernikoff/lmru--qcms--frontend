import {useTranslation} from 'react-i18next';
import {Grid, Textarea, Typography} from 'fronton-react';
import {useParams} from 'react-router-dom';
import modelsApi from '../modelsApi';
import styles from './ModelDetails.module.css';

const ModelDetailsDescription: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    return (
        <Grid rowGap={16} columnGap={16} columns="1fr" alignContent="start" justifyContent="start">
            <Typography variant="h3">{t('ModelDetails.Description.Title')}</Typography>
            <Textarea className={styles.description} value={details?.qualityModelDescription} />
        </Grid>
    );
};

export default ModelDetailsDescription;
