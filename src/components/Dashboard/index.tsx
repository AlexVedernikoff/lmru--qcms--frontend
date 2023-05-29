import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Typography} from 'fronton-react';
import DashboardProviderRole from './DashboardProviderRole';
import DashboardServiceProviderRole from './DashboardServiceProviderRole';
import {DashboardKeyUser} from './DashboardKeyUser';
import {DashboardQE} from './DashboardQE';

enum EUserRole {
    PROVIDER = 'provider',
    SERVICE_PROVIDER = 'service_provider',
    SQM = 'sqm',
    QE = 'QE',
    KEY_USER = 'key_user',
}

let role: EUserRole;

const Dashboard: React.FC = () => {
    const {t} = useTranslation('dashboard');

    const item = useMemo(() => {
        switch (role) {
            case EUserRole.PROVIDER:
                return <DashboardProviderRole />;
            case EUserRole.SERVICE_PROVIDER:
                return <DashboardServiceProviderRole />;
            case EUserRole.KEY_USER:
                return <DashboardKeyUser />;
            case EUserRole.QE:
                return <DashboardQE />;
            default:
                return <DashboardProviderRole />;
        }
    }, []);

    return (
        <Grid rowGap={48}>
            <Typography variant="h2">{t('Title')}</Typography>
            <Grid columns="250px 1fr" rowGap={16}>
                {item}
            </Grid>
        </Grid>
    );
};

export default Dashboard;
