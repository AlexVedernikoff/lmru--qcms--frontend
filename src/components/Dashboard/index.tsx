import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {Outlet} from 'react-router-dom';
import {DashboardKeyUser} from './DashboardKeyUser';
import {DashboardQE} from './DashboardQE';

const Dashboard: React.FC = () => {
    const {t} = useTranslation('dashboard');

    return (
        <Grid rowGap={16}>
            {
                <Grid rowGap={16}>
                    <Typography variant="h2">{t('Title')}</Typography>
                    <Grid columns="251px 1fr" rowGap={16}>
                        {
                            // Если key user &&
                            <DashboardKeyUser />
                        }
                        {
                            // Если QE &&
                            <DashboardQE />
                        }
                    </Grid>
                </Grid>
            }
            <Grid rowGap={16}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
