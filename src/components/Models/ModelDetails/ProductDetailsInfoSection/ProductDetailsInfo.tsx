import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../Common.module.css';

const ProductDetailsInfo: React.FC = () => {
    const {t} = useTranslation('products');

    return (
        <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
            <Typography variant="h3">{t('ProductDetails.Info.InfoDetails.Title')}</Typography>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProductDetails.Info.InfoDetails.Field.gamma')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {t('ProductDetails.Info.InfoDetails.Field.link')}
                </Typography>
            </div>
        </Grid>
    );
};

export default ProductDetailsInfo;
