import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {useMemo, useState} from 'react';
import {Grid, RegularButton, Tab, TabList, Typography} from 'fronton-react';
import styles from '../../Common.module.css';
import ModelDetailsMainData from './ModelDetailsMainData';
import ModelDetailsQualityManager from './ModelDetailsQualityManager';
import ModelDetailsCharacteristics from './ModelDetailsCharacteristics';
import ModelDetailsRiskLevel from './ModelDetailsRiskLevel';
import ModelDetailsDescription from './ModelDetailsDescription';
import ModelDetailsMasterPlan from './ModelDetailsMasterPlan';
import ModelDetailsRiskMap from './ModelDetailsRiskMap';
import modelsApi from '../modelsApi';

enum ETabs {
    masterPlan,
    riskMap,
}

const ModelDetails: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQuery({id, securityCode: 'security_code'});

    const title = useMemo(() => `${details?.qualityModelFullName} - ${id}`, [details?.qualityModelFullName, id]);

    const [activeTab, setActiveTab] = useState<ETabs>(ETabs.masterPlan);

    const handleTabChange = (_event: React.SyntheticEvent<Element, Event>, tab: ETabs) => {
        setActiveTab(tab);
    };

    return (
        <Grid rowGap={16} rows="auto 1fr">
            <Grid columnGap={16} columns="1fr auto">
                <Typography variant="h2">{title}</Typography>
                <div>
                    <RegularButton>{t('Buttons.Edit')}</RegularButton>
                </div>
            </Grid>

            <Grid className={styles.panel} rowGap={24} columnGap={16}>
                <Grid columnGap={16} columns="570px 1fr">
                    <ModelDetailsMainData />
                    <ModelDetailsQualityManager />
                </Grid>

                <ModelDetailsCharacteristics />

                <Grid columnGap={16} columns="300px 1fr">
                    <ModelDetailsRiskLevel onResetClick={() => {}} />
                    <ModelDetailsDescription />
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
                    {activeTab === ETabs.masterPlan && <ModelDetailsMasterPlan />}
                    {activeTab === ETabs.riskMap && <ModelDetailsRiskMap />}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ModelDetails;
