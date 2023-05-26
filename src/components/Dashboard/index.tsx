import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {Outlet, useParams} from 'react-router-dom';
import {DashboardKeyUser} from './DashboardKeyUser';
import {DashboardQE} from './DashboardQE';

const Dashboard: React.FC = () => {
    const {t} = useTranslation('dashboard');
    const {id} = useParams();

    return (
        <Grid rowGap={16}>
            {!id && (
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
            )}
            <Grid rowGap={16}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
