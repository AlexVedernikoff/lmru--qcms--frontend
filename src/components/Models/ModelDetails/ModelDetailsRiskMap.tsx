import {useTranslation} from 'react-i18next';
import {Grid, GridItem, Typography} from 'fronton-react';
import commonStyles from '../../Common.module.css';
// import styles from './ModelDetails.module.css';
import TextBlock from '../Common/TextBlock';
import ModelDetailsRiskLevel from './ModelDetailsRiskLevel';

const ModelDetailsRiskMap: React.FC = () => {
    const {t} = useTranslation('models');

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
                        <TextBlock label={t('ModelDetails.RiskMap.Group.Field.riskProperty')} text={1} />
                        <TextBlock label={t('ModelDetails.RiskMap.Group.Field.riskByProductUsageNegative')} text={1} />
                        <TextBlock label={t('ModelDetails.RiskMap.Group.Field.riskLegal')} text={1} />
                        <TextBlock label={t('ModelDetails.RiskMap.Group.Field.riskByProductUsagePositive')} text={1} />
                        <TextBlock label={t('ModelDetails.RiskMap.Group.Field.riskEnvironment')} text={1} />
                        <TextBlock label={t('ModelDetails.RiskMap.Group.Field.riskHealth')} text={1} />
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
