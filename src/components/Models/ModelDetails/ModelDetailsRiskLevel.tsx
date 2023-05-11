import {useTranslation} from 'react-i18next';
import {Chip, Grid, RegularButton, Typography} from 'fronton-react';
import HistoryBackIcon from '../../Icons/HistoryBackIcon';
import styles from './ModelDetails.module.css';

interface IProps {
    onResetClick?: () => void;
}

const ModelDetailsRiskLevel: React.FC<IProps> = ({onResetClick}) => {
    const {t} = useTranslation('models');

    return (
        <Grid columns="1fr" alignContent="start" justifyContent="start" rowGap={16}>
            <Typography variant="h3">{t('ModelDetails.RiskLevel.Title')}</Typography>

            <Grid columns="180px auto" columnGap={12}>
                <Chip
                    className={styles.unurgentChip}
                    variant="primary"
                    text={t('ModelDetails.RiskLevel.Field.unurgent')}
                    deleteIcon={<></>}
                />

                {onResetClick && (
                    <RegularButton iconOnly href={''} rel={''} aria-label="" variant="pseudo" onClick={onResetClick}>
                        <HistoryBackIcon />
                    </RegularButton>
                )}
            </Grid>
        </Grid>
    );
};

export default ModelDetailsRiskLevel;
