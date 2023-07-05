import {Checkbox, Dropdown, DropdownItem, Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';

import productDetailsStyles from './productDetailsInfo.module.css';

import {
    useGetDetailsForProductsQuery,
    usePostSearchQModelsMutation,
    usePostUpdateProductMutation,
} from '../productDetailsApi';

import {mockUser, securityCode} from '../mockProductDetails';
import {productDetailsProductMapping} from '../ProductDetailsMapping/ProductDetailsInfoSection/ProductDetailsProduct/productDetailsProductMapping';
import {
    ProductDetails,
    IProductDeatilsProductMapping,
    IUpdateBodyReq,
    IQsearchModelsReq,
} from '../../../../common/types/productDetails';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import EditProductDetailsButton from '../EditProductDetailsButton/EditProductDetailsButton';

interface IQModalLabel {
    qualityModelLabel: string;
    qualityModalId: string;
}

const ProductDetailsProduct: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();

    const {data} = useGetDetailsForProductsQuery({productId, securityCode});

    const [postUpdateProduct] = usePostUpdateProductMutation();
    const [postSearchQModels] = usePostSearchQModelsMutation();

    const [details, setDetails] = useState<ProductDetails>();
    const [productSection, setProductSection] = useState<IProductDeatilsProductMapping>();

    const [isEdit, setIsEdit] = useState(false);

    const [qModalLabels, setqModalLabel] = useState<IQModalLabel[]>([]);
    const [qModalLabel, setQModalLabel] = useState<IQModalLabel>({
        qualityModelLabel: productSection?.qualityModelLabel ? productSection.qualityModelLabel : '',
        qualityModalId: productSection?.qualityModelId ? productSection.qualityModelId : '',
    });

    useEffect(() => {
        if (productSection?.qualityModelLabel) {
            const updateQModelLabel = {
                qualityModelLabel: productSection.qualityModelLabel,
                qualityModalId: productSection.qualityModelId,
            };
            setQModalLabel(updateQModelLabel);
        }
    }, [productSection]);

    useEffect(() => {
        data && setDetails(data);
    }, [data]);

    useEffect(() => {
        const mapping = productDetailsProductMapping(t, details);
        setProductSection(mapping);
    }, [details, t]);

    const updateBoxes = async (isChemistryChanged: boolean) => {
        if (productSection) {
            const body: IUpdateBodyReq = {
                products: [
                    {
                        id: parseInt(productId, 10),
                        isProductWithSubstances: isChemistryChanged
                            ? !productSection.isChemical
                            : productSection.isChemical,
                        qualityModelId: qModalLabel.qualityModalId,
                    },
                ],
                updatedBy: mockUser,
            };

            try {
                await postUpdateProduct({body, securityCode}).unwrap();
                setIsEdit(false);
            } catch (error) {
                alert('Ошибка при обновлении продукта');
            }
        }
    };

    const handleQModel = async () => {
        if (details?.productModelNomenclature?.modelCodeId || details?.productModelNomenclature?.modelCodeId === 0) {
            const body: IQsearchModelsReq = {
                pageIndex: 0,
                pageSize: 1000,
                searchBy: {
                    productModelNomenclatureModelCode: [`${details.productModelNomenclature.modelCodeId}`],
                },
            };
            try {
                const searchQModels = await postSearchQModels({body, securityCode}).unwrap();
                const qModalLabelArr = searchQModels.content.map(qModal => ({
                    qualityModelLabel: qModal.qualityModelLabel ? qModal.qualityModelLabel : '',
                    qualityModalId: qModal.id ? `${qModal.id}` : '',
                }));

                setqModalLabel(qModalLabelArr);
            } catch (error) {
                alert('Ошибка при редактировании модели качества');
            }
        }
        setIsEdit(!isEdit);
    };

    const handleSelectLabel = (id: string | null) => {
        if (id) {
            const findQModalLabel = qModalLabels.find(el => el.qualityModalId === id);
            findQModalLabel && setQModalLabel(findQModalLabel);
        }
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
                    <Grid rowGap={1} columnGap={10} columns="max-content max-content">
                        {!isEdit ? (
                            <>
                                <Typography variant="s" size="body_long" color="text-minor">
                                    {t('ProductDetails.Info.Product.Field.qualityModel')}
                                </Typography>

                                <EditProductDetailsButton onClick={handleQModel} />

                                <Typography variant="s" size="body_short">
                                    {productSection?.qualityModelLabel}
                                </Typography>
                                <div />
                            </>
                        ) : (
                            <>
                                <Dropdown
                                    size="s"
                                    closeOnSelect
                                    className={productDetailsStyles.dropdown}
                                    label={t('ProductDetails.Info.Product.Field.qualityModel')}
                                    value={qModalLabel.qualityModelLabel}
                                    onSelect={e => handleSelectLabel(e)}
                                >
                                    <div className={productDetailsStyles.editWrapper}>
                                        {qModalLabels.map(
                                            (el, i) =>
                                                el.qualityModelLabel &&
                                                el.qualityModalId && (
                                                    <DropdownItem
                                                        className={productDetailsStyles.dropdownItem}
                                                        text={el.qualityModelLabel}
                                                        value={el.qualityModalId}
                                                        key={i}
                                                    />
                                                )
                                        )}
                                    </div>
                                </Dropdown>

                                <Checkbox checked={false} onClick={() => updateBoxes(false)} />
                            </>
                        )}
                    </Grid>
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
                    onClick={() => updateBoxes(true)}
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
