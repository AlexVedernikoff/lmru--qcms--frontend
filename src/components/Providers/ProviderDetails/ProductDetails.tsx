import {Grid, Typography} from 'fronton-react';
import ProviderDetailsInfoSection from './ProviderDetailsInfoSection';
import ProviderTabsSection from './ProviderTabsSection';

const ProviderDetails: React.FC = () => {

    const title = `EUR - KRINS LAKRA`;

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{title}</Typography>
            <ProviderDetailsInfoSection />
            <ProviderTabsSection />
        </Grid>
    );
};

export default ProviderDetails;
