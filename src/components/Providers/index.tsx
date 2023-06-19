import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {Outlet, useParams} from 'react-router-dom';
import ProvidersList from './ProvidersList';

const Providers: React.FC = () => {
    const {t} = useTranslation('providers');
    const {id} = useParams();

    return (
        <Grid rowGap={16}>
            {!id && (
                <Grid rowGap={16}>
                    <Typography variant="h2">{t('Title')}</Typography>
                    <Grid rowGap={16}>
                        <ProvidersList />
                    </Grid>
                </Grid>
            )}
            <Grid rowGap={16}>
                <Outlet />
            </Grid>
        </Grid>
    );
};

export default Providers;
