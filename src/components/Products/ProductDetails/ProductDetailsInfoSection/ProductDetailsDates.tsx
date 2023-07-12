import {Checkbox, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import {useGetDetailsForProductsQuery} from '../productDetailsApi';
import {getDateTimeUtcThree} from '../../../../utils/convertDateFromServer';
import {useParams} from 'react-router-dom';

const ProductDetailsDates: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();

    const {data: details} = useGetDetailsForProductsQuery({productId});

    const createdAt = details?.creationInformation?.createdAt
        ? getDateTimeUtcThree(details.creationInformation.createdAt, 'dd.MM.yyyy')
        : '-';
    const avsDate = details?.productAVSDate ? getDateTimeUtcThree(details.productAVSDate, 'dd.MM.yyyy') : '-';

    return (
        <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
            <Typography variant="h3">{t('ProductDetails.Info.Dates.Title')}</Typography>

            <Grid rowGap={4} columns="1fr 1fr">
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Dates.Field.creationDate')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short" style={{whiteSpace: 'pre-line', wordBreak: 'break-word'}}>
                        {createdAt}
                    </Typography>
                </div>

                <div>
                    <Checkbox disabled={true} checked={false} label={t('ProductDetails.Info.Dates.Field.AVS')} />
                    <Typography
                        variant="s"
                        size="body_short"
                        style={{whiteSpace: 'pre-line', wordBreak: 'break-word', paddingLeft: '28px'}}
                    >
                        {avsDate}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
};

export default ProductDetailsDates;
