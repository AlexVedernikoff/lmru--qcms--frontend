import {Checkbox, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';

const ProductDetailsProduct: React.FC = () => {
    const {t} = useTranslation('products');

    return (
        <Grid className={styles.sectionItem} rowGap={24} columnGap={24}>
            <Typography variant="h3">{t('ProductDetails.Info.Product.Title')}</Typography>

            <Grid rowGap={4} columns="1fr 3fr repeat(2, 1fr)">
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Product.Field.productCode')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {'87334230'}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Product.Field.EAN')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {'4607141437762'}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Product.Field.TN_VED_Code')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {'3209100009'}
                    </Typography>
                </div>
            </Grid>

            <Grid rowGap={4} columns="1fr 3fr repeat(2, 1fr)">
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Product.Field.risk')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {t('ProductDetails.Info.Product.RiskOptions.minor')}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Product.Field.qualityModel')}
                    </Typography>
                    <br />
                    {/* <LinkButton> */}
                    <Typography variant="s" size="body_short">
                        {'Decorative plaster in paste form'}
                    </Typography>
                    {/* </LinkButton> */}
                </div>
            </Grid>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProductDetails.Info.Product.Field.productModel')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {
                        '11_Краски / Фасадная краска Штукатурка и широкая облицовка фасада / Декоративная штукатурка для наружных работ'
                    }
                </Typography>
            </div>

            <div>
                <Checkbox checked={false} label={t('ProductDetails.Info.Product.Field.isChemical')} />
            </div>

            <Grid rowGap={4} columns="165px 250px 200px 1fr">
                <Checkbox checked={false} label={t('ProductDetails.Info.Product.Field.STM')} />
                <Checkbox checked={false} label={t('ProductDetails.Info.Product.Field.intImport')} />
                <Checkbox checked={false} label={t('ProductDetails.Info.Product.Field.fromProject')} />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsProduct;
