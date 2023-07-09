import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {useMemo, useState} from 'react';
import {Grid, Tab, TabList, Typography} from 'fronton-react';
import styles from '../../Common.module.css';
import ModelDetailsMainData from './ModelDetailsMainData';
import ModelDetailsQualityManager from './ModelDetailsQualityManager';
import ModelDetailsCharacteristics from './ModelDetailsCharacteristics';
import ModelDetailsRiskLevel from './ModelDetailsRiskLevel';
import ModelDetailsDescription from './ModelDetailsDescription';
import ModelDetailsMasterPlanList from './ModelDetailsMasterPlanList';
import ModelDetailsRiskMap from './ModelDetailsRiskMap';
import modelsApi from '../modelsApi';
import LoadingOverlay from '../../Common/LoadingOverlay';

enum ETabs {
    masterPlan,
    riskMap,
}

const ModelDetails: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details, isLoading, isFetching} = modelsApi.endpoints.getModelDetails.useQuery({id});

    const title = useMemo(
        () => (details?.qualityModelFullName ? `${details?.qualityModelFullName} - ${id}` : '-'),
        [details?.qualityModelFullName, id]
    );

    const [activeTab, setActiveTab] = useState<ETabs>(ETabs.masterPlan);

    const handleTabChange = (_event: React.SyntheticEvent<Element, Event>, tab: ETabs) => {
        setActiveTab(tab);
    };

    return (
        <Grid rowGap={16} rows="auto 1fr">
            <Grid columnGap={16} columns="1fr auto">
                <Typography variant="h2">{title}</Typography>
            </Grid>

            <Grid className={styles.panel} rowGap={24} columnGap={16}>
                <Grid columnGap={16} columns="1fr auto">
                    <ModelDetailsMainData />
                    <ModelDetailsQualityManager />
                </Grid>

                <Grid gap={24} style={{margin: '0 12px'}}>
                    <ModelDetailsCharacteristics />

                    <Grid columnGap={24} columns="auto 1fr">
                        <ModelDetailsRiskLevel />
                        <ModelDetailsDescription />
                    </Grid>
                </Grid>

                <TabList active={activeTab} onChangeTab={handleTabChange} className={styles.tabs} size="l">
                    <Tab name="masterPlan" value={ETabs.masterPlan}>
                        {t('ModelDetails.MasterPlan.Title')}
                    </Tab>
                    <Tab name="riskMap" value={ETabs.riskMap}>
                        {t('ModelDetails.RiskMap.Title')}
                    </Tab>
                </TabList>

                <Grid>
                    {activeTab === ETabs.masterPlan && <ModelDetailsMasterPlanList />}
                    {activeTab === ETabs.riskMap && <ModelDetailsRiskMap />}
                </Grid>
            </Grid>

            {(isLoading || isFetching) && <LoadingOverlay />}
        </Grid>
    );
};

export default ModelDetails;
