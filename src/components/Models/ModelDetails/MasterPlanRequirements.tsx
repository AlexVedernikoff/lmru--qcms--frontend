import {useTranslation} from 'react-i18next';
import {Grid, Typography} from 'fronton-react';
import {useParams} from 'react-router-dom';
import CardView from '../../Common/CardView';
import MasterPlanTable from './MasterPlanTable';
import modelsApi from '../modelsApi';

const MasterPlanRequirements: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    const handleCardClose = () => {};

    return (
        <Grid rowGap={24}>
            <Grid columns="1fr 1fr 1fr" columnGap={24} rowGap={24}>
                {details?.regulatoryReferences?.map((data, index) => (
                    <CardView
                        key={index}
                        header={data.required ? t('ModelDetails.MasterPlan.Requirement.Type.Required') : ''}
                        onClose={handleCardClose}
                        infoLink={data.hyperlink}
                    >
                        <Typography variant="s" size="body_accent">
                            {data.title}
                        </Typography>
                    </CardView>
                ))}
            </Grid>

            <MasterPlanTable />
        </Grid>
    );
};

export default MasterPlanRequirements;
