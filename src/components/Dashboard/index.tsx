import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Typography} from 'fronton-react';
import DashboardProviderRole from './DashboardProviderRole';
import DashboardServiceProviderRole from './DashboardServiceProviderRole';

enum EUserRole {
    PROVIDER = 'provider',
    SERVICE_PROVIDER = 'service_provider',
    SQM = 'sqm',
}

const Dashboard: React.FC = () => {
    const {t} = useTranslation('dashboard');

    // temp var
    const role: EUserRole = true ? EUserRole.PROVIDER : EUserRole.SERVICE_PROVIDER;

    const item = useMemo(() => {
        switch (role) {
            case EUserRole.PROVIDER:
                return <DashboardProviderRole />;
            case EUserRole.SERVICE_PROVIDER:
                return <DashboardServiceProviderRole />;
            default:
                return <div>undefined</div>;
        }
    }, [role]);

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{t('Title')}</Typography>
            <Grid columns="250px 1fr" rowGap={16}>
                {item}
            </Grid>
        </Grid>
    );
};

export default Dashboard;
