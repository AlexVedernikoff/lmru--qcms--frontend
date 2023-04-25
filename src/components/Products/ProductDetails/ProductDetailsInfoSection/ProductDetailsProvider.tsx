import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../ProductDetails.module.css';

const ProductDetailsProvider: React.FC = () => {
    const {t} = useTranslation('products');

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <Typography variant="h3">{t('ProductDetails.Info.Provider.Title')}</Typography>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProductDetails.Info.Provider.Field.providerName')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'1000771901 - ООО "Сен-Гобен Строительная Продукция Рус"'}
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
        </Grid>
    );
};

export default ProductDetailsProvider;
