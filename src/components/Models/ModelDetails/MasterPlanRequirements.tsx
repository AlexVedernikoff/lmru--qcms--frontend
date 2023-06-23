import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Typography} from 'fronton-react';
import {useParams} from 'react-router-dom';
import CardView from '../../Common/CardView';
import MasterPlanTable from './MasterPlanTable';
import modelsApi from '../modelsApi';

const infoLink = 'https://localhost:3000/';
const mock: string[] = new Array(5).fill(infoLink);

const MasterPlanRequirements: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    const requirementText = useMemo(
        () => [
            <Typography key={'1'} variant="s" size="body_accent" color="attention-primary">
                {t('ModelDetails.MasterPlan.Requirement.Option.PackingInformation')}
            </Typography>,
            <Typography key={'2'} variant="s" size="body_accent">
                {t('ModelDetails.MasterPlan.Requirement.Option.Empty')}
            </Typography>,
        ],
        [t]
    );

    const handleCardClose = () => {};

    return (
        <Grid rowGap={24}>
            <Grid columns="1fr 1fr 1fr" columnGap={24} rowGap={24}>
                {mock.map((link, index) => (
                    <CardView
                        key={index}
                        header={t('ModelDetails.MasterPlan.Requirement.Type.Required')}
                        onClose={handleCardClose}
                        infoLink={link}
                    >
                        {requirementText}
                    </CardView>
                ))}
            </Grid>

            <MasterPlanTable />
        </Grid>
    );
};

export default MasterPlanRequirements;
