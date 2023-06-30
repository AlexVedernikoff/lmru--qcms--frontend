import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import {useGetDetailsForProductsQuery} from '../productDetailsApi';

import {productId, securityCode} from '../mockProductDetails';

const ProductDetailsInfo: React.FC = () => {
    const {t} = useTranslation('products');

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});
    // console.log('details?.range', details?.range);

    return (
        <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
            <Typography variant="h3">{t('ProductDetails.Info.InfoDetails.Title')}</Typography>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProductDetails.Info.InfoDetails.Field.gamma')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {details?.range}
                </Typography>
            </div>
        </Grid>
    );
};

export default ProductDetailsInfo;
