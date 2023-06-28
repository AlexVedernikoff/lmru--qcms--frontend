import {Checkbox, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import {useGetDetailsForProductsQuery} from '../productDetailsApi';

import {productId, securityCode} from '../mockProductDetails';
import {converStringToDateTime} from '../../../../utils/convertDateFromServer';

const ProductDetailsDates: React.FC = () => {
    const {t} = useTranslation('products');

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});

    const createdAt =
        details?.creationInformation.createdAt && converStringToDateTime(details?.creationInformation.createdAt);

    return (
        <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
            <Typography variant="h3">{t('ProductDetails.Info.Dates.Title')}</Typography>

            <Grid rowGap={4} columns="1fr 1fr">
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Dates.Field.creationDate')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {createdAt}
                    </Typography>
                </div>

                <div>
                    <Checkbox checked={false} label={t('ProductDetails.Info.Dates.Field.AVS')} />
                </div>
            </Grid>
        </Grid>
    );
};

export default ProductDetailsDates;
