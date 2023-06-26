import {useTranslation} from 'react-i18next';
import {Grid, GridItem, Typography} from 'fronton-react';
import {useParams} from 'react-router-dom';
import commonStyles from '../../Common.module.css';
import modelsApi from '../modelsApi';
import TextBlock from '../Common/TextBlock';
import ModelDetailsRiskLevel from './ModelDetailsRiskLevel';

const ModelDetailsRiskMap: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    return (
        <Grid
            className={commonStyles.sectionItem}
            areas={['field field field field level level']}
            rowGap={16}
            columnGap={16}
        >
            <GridItem area="field">
                <Grid rowGap={16}>
                    <Typography variant="h3">{t('ModelDetails.RiskMap.Group.Title')}</Typography>

                    <Grid columns="repeat(3, 1fr)" rowGap={24} columnGap={24}>
                        <TextBlock
                            label={t('ModelDetails.RiskMap.Group.Field.riskProperty')}
                            text={details?.productGroupRisks?.productRiskLevel}
                        />
                        <TextBlock
                            label={t('ModelDetails.RiskMap.Group.Field.riskByProductUsageNegative')}
                            text={details?.productGroupRisks?.personLevelRiskForNonCorrectUsage}
                        />
                        <TextBlock
                            label={t('ModelDetails.RiskMap.Group.Field.riskLegal')}
                            text={details?.productGroupRisks?.regulatoryRisk}
                        />
                        <TextBlock
                            label={t('ModelDetails.RiskMap.Group.Field.riskByProductUsagePositive')}
                            text={details?.productGroupRisks?.personLevelRiskForCorrectUsage}
                        />
                        <TextBlock
                            label={t('ModelDetails.RiskMap.Group.Field.riskEnvironment')}
                            text={details?.productGroupRisks?.sustainabilityRisk}
                        />
                        <TextBlock
                            label={t('ModelDetails.RiskMap.Group.Field.riskHealth')}
                            text={details?.productGroupRisks?.healthRisk}
                        />
                    </Grid>
                </Grid>
            </GridItem>

            <GridItem area="level">
                <ModelDetailsRiskLevel />
            </GridItem>
        </Grid>
    );
};

export default ModelDetailsRiskMap;
