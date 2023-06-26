import {Checkbox, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import classes from './styles.module.css';
import {useGetSupplierDetsQuery} from '../../../../api/getSupplierDetails';

const ProviderDetailsProfile: React.FC = () => {
    const {t} = useTranslation('providers');
    const supplierId = window.location.href.split('/').slice(-1)[0];
    const {data: supplierDetails} = useGetSupplierDetsQuery(supplierId);

    return (
        <Grid className={styles.sectionItem} rows="0.3fr 0.3fr 0.5fr 0.5fr 0.5fr 0.5fr">
            <Typography variant="h3">{t('ProviderDetails.ProductData.ProfileComplete')}</Typography>
            <div>
                <Typography className={classes.AvailabilitySTMProduct} variant="s" size="body_long">
                    {t('ProviderDetails.ProductData.AvailabilitySTMProduct')}
                </Typography>
            </div>

            <Grid rowGap={4}>
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.ProductData.Platform')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {supplierDetails?.supplierSelfRatingPlatform}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.ProductData.QE')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {'Иванова Екатерина'}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.ProductData.You')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {'Трейдер'}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.ProductData.YouProvide')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {'Оба'}
                    </Typography>
                </div>
            </Grid>

            <Grid className={classes.layoutCheckbox} columns="1fr 1fr 5fr">
                <Checkbox checked={false} label={t('Common.Yes')} />
                <Checkbox checked={false} label={t('Common.No')} />
                <Typography variant="s" size="body_short">
                    {t('ProviderDetails.ProductData.SupplierOneFactory')}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ProviderDetailsProfile;
