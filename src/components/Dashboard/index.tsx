import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Typography} from 'fronton-react';
import DashboardSupplierRole from './DashboardSupplierRole';
import DashboardServiceProviderRole from './DashboardServiceProviderRole';
import {DashboardKeyUser} from './DashboardKeyUser';
import {EUserRole} from '../../common/roles';
import {DashboardQEorSQM} from './DashboardQEorSQM';

let role: EUserRole = EUserRole.Supplier;

const Dashboard: React.FC = () => {
    const {t} = useTranslation('dashboard');

    const item = useMemo(() => {
        switch (role) {
            case EUserRole.Supplier:
                return <DashboardSupplierRole />;
            case EUserRole.ServiceProvider:
                return <DashboardServiceProviderRole />;
            case EUserRole.KeyUser:
                return <DashboardKeyUser />;
            case EUserRole.QE:
            case EUserRole.SQM:
                return <DashboardQEorSQM userRole={role} />;
            default:
                return <DashboardKeyUser />;
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
