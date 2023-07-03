import {Checkbox, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';

import {useGetDetailsForProductsQuery, usePostUpdateProductMutation} from '../productDetailsApi';

import {mockUser, securityCode} from '../mockProductDetails';
import {productDetailsProductMapping} from '../ProductDetailsMapping/ProductDetailsInfoSection/ProductDetailsProduct/productDetailsProductMapping';
import {ProductDetails, IProductDeatilsProductMapping, IUpdateBodyReq} from '../../../../common/types/productDetails';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const ProductDetailsProduct: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();

    const {data} = useGetDetailsForProductsQuery({productId, securityCode});

    const [postUpdateProduct] = usePostUpdateProductMutation();

    const [details, setDetails] = useState<ProductDetails>();
    const [productSection, setProductSection] = useState<IProductDeatilsProductMapping>();

    useEffect(() => {
        data && setDetails(data);
    }, [data]);

    useEffect(() => {
        const mapping = productDetailsProductMapping(t, details);
        setProductSection(mapping);
    }, [details, t]);

    const updateChemestryBox = async () => {
        const body: IUpdateBodyReq = {
            products: [
                {
                    id: parseInt(productId, 10),
                    isProductWithSubstances: !productSection?.isChemical,
                },
            ],
            updatedBy: mockUser,
        };

        const update = await postUpdateProduct({body, securityCode}).unwrap();
        setDetails(update[0]);
    };

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
                        {productSection?.code}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Product.Field.EAN')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {productSection?.ean}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Product.Field.TN_VED_Code')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {productSection?.customId}
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
                        {productSection?.riskOption}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProductDetails.Info.Product.Field.qualityModel')}
                    </Typography>
                    <br />
                    {/* <LinkButton> */}
                    <Typography variant="s" size="body_short">
                        {productSection?.qualityModel}
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
                    {productSection?.productModelValueStr}
                </Typography>
            </div>

            <div>
                <Checkbox
                    onClick={updateChemestryBox}
                    checked={productSection?.isChemical || false}
                    label={t('ProductDetails.Info.Product.Field.isChemical')}
                />
            </div>

            <Grid rowGap={4} columns="165px 250px 200px 1fr">
                <Checkbox checked={productSection?.isSTM || false} label={t('ProductDetails.Info.Product.Field.STM')} />
                <Checkbox
                    checked={productSection?.isImport || false}
                    label={t('ProductDetails.Info.Product.Field.intImport')}
                />
                <Checkbox
                    checked={productSection?.isFromProject || false}
                    label={t('ProductDetails.Info.Product.Field.fromProject')}
                />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsProduct;
