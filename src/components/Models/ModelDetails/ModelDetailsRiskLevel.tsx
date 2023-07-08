import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Grid, RegularButton, Typography} from 'fronton-react';
import {ERiskLevel} from '../../../common/types/models';
import HistoryBackIcon from '../../Icons/HistoryBackIcon';
import modelsApi from '../modelsApi';
import styles from './ModelDetails.module.css';

interface IProps {
    onResetClick?: () => void;
}

const ModelDetailsRiskLevel: React.FC<IProps> = ({onResetClick}) => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id});

    const riskParams = useMemo(() => {
        let style = '';
        let label = '';

        switch (details?.productGroupRisks.calculatedRisk) {
            case ERiskLevel.CRITICAL:
                label = t('ModelDetails.RiskLevel.Field.critical');
                style = styles.criticalChip;
                break;
            case ERiskLevel.MAJOR:
                label = t('ModelDetails.RiskLevel.Field.major');
                style = styles.majorChip;
                break;
            case ERiskLevel.MINOR:
                label = t('ModelDetails.RiskLevel.Field.minor');
                style = styles.minorChip;
                break;
        }

        return {style, label};
    }, [details?.productGroupRisks.calculatedRisk, t]);

    return (
        <Grid columns="1fr" alignContent="start" justifyContent="start" rowGap={16}>
            <Typography variant="h3">{t('ModelDetails.RiskLevel.Title')}</Typography>

            <Grid columns="auto auto" columnGap={12}>
                <RegularButton className={riskParams.style} rounded>
                    {riskParams.label}
                </RegularButton>

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
