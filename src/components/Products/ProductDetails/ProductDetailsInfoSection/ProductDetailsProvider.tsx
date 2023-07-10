import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import {useGetDetailsForProductsQuery} from '../productDetailsApi';
import {useParams} from 'react-router-dom';
import LoadingOverlay from 'components/Common/LoadingOverlay';

const ProductDetailsProvider: React.FC = () => {
    const {t} = useTranslation('products');

    const {id: productId = ''} = useParams();

    const {data: details, isFetching, isLoading} = useGetDetailsForProductsQuery({productId});

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <Typography variant="h3">{t('ProductDetails.Info.Provider.Title')}</Typography>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProductDetails.Info.Provider.Field.providerName')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {details?.supplierCode ? details.supplierCode : '-'}
                </Typography>
            </div>

            <br />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProductDetails.Info.Provider.Field.providerStatus')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {t('ProductDetails.Info.Provider.Field.distributor')}
                </Typography>
            </div>

            {(isLoading || isFetching) && <LoadingOverlay />}
        </Grid>
    );
};

export default ProductDetailsProvider;
