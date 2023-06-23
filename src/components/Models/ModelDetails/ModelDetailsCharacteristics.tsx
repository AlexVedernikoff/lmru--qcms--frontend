import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Chip, Grid, Typography} from 'fronton-react';
import modelsApi from '../modelsApi';
import styles from './ModelDetails.module.css';

const ModelDetailsCharacteristics: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    const [items, setItems] = useState(
        details?.qualityModelCharacteristics?.map(v => ({
            label: v.featureName,
            value: v.featureCode,
        })) || []
    );

    const handleChipDelete: React.MouseEventHandler<HTMLButtonElement> = e => {
        const {value} = e.currentTarget.dataset;
        setItems(current => current.filter(item => item.value !== value));
    };

    return (
        <Grid rowGap={16} columnGap={16} columns="1fr">
            <Typography variant="h3">{t('ModelDetails.Characteristics.Title')}</Typography>

            <div className={styles.flexRow}>
                {items.length > 0
                    ? items.map((item, i) => (
                          <Chip
                              key={i}
                              text={item.label}
                              data-value={item.value}
                              variant="secondary"
                              onDelete={handleChipDelete}
                          />
                      ))
                    : '-'}
            </div>
        </Grid>
    );
};

export default ModelDetailsCharacteristics;
