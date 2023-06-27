import {Grid} from 'fronton-react';
import ProductsFilter, {IFilterFormState} from './ProductsFilter';
import ProductsTable from './ProductsTable';
import styles from '../../Common.module.css';
import withModelApi from './withModelApi';
import {useState} from 'react';
import {IWithModelItem, IWithModelParams} from '../../../common/types/withModel';
import ProductsActionsForm, {ProductsActions} from './ProductsActionsForm';

const ProductsWithQualityModel: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<IWithModelItem[]>([]);

    const [page, setPage] = useState<Pick<IWithModelParams['body'], 'pageSize' | 'pageIndex'>>({
        pageSize: 10,
        pageIndex: 0,
    });

    const [sort] = useState<Pick<IWithModelParams['body'], 'sortField' | 'sortDirection'>>({
        // sortField: 'createdAt',
        sortDirection: 'DESC',
    });

    const [searchBy, setSearchBy] = useState<IWithModelParams['body']['searchBy']>({});

    const {data, isLoading} = withModelApi.useGetModelsQuery({
        header: {
            securityCode: 'security_code',
        },
        body: {
            ...page,
            ...sort,
            searchBy,
        },
    });

    const handleFiltersSubmit = (filters: IFilterFormState) => {
        setSearchBy(p => ({
            ...p,
            code: filters.code ? filters.code : undefined,
            ean: filters.ean ? filters.ean : undefined,
            description: filters.description ? filters.description : undefined,
            customId: filters.customId ? filters.customId : undefined,
            qualityModelId: filters.qualityModelId ? parseInt(filters.qualityModelId, 10) : undefined,
            supplierName: filters.supplierName ? filters.supplierName : undefined,
            supplierRMSCode: filters.supplierRMSCode ? filters.supplierRMSCode : undefined,
            supplierTaxIndetifier: filters.supplierTaxIndetifier ? filters.supplierTaxIndetifier : undefined,
            productModelNomenclature:
                filters.productModelNomenclatureDepartmentCode ||
                filters.productModelNomenclatureSubDepartmentCode ||
                filters.productModelNomenclatureConsolidationCode ||
                filters.productModelNomenclatureModelCode
                    ? [
                          {
                              productModelNomenclatureDepartmentCode: filters.productModelNomenclatureDepartmentCode,
                              productModelNomenclatureSubDepartmentCode:
                                  filters.productModelNomenclatureSubDepartmentCode,
                              productModelNomenclatureConsolidationCode:
                                  filters.productModelNomenclatureConsolidationCode,
                              productModelNomenclatureModelCode: filters.productModelNomenclatureModelCode,
                          },
                      ]
                    : undefined,
            status: filters.status ? filters.status : undefined,
            regulatoryStatus: filters.regulatoryStatus ? filters.regulatoryStatus : undefined,
            buCode: filters.buCode ? [parseInt(filters.buCode, 10)] : undefined,
            attributes: filters.attributeCode
                ? {
                      attributeCode: filters.attributeCode,
                      value: [filters?.value],
                  }
                : undefined,
            range: filters.range ? filters.range : undefined,
            mdd: filters.mdd === true || filters.mdd === false ? filters.mdd : undefined,
            import: filters.import === true || filters.import === false ? filters.import : undefined,
            isProductWithSubstance:
                filters.isProductWithSubstance === true || filters.isProductWithSubstance === false
                    ? filters.isProductWithSubstance
                    : undefined,
        }));
    };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex: pageIndex - 1, pageSize});
    };

    // TODO: доработать функцию в следующем ПР.
    const handleProductsActionFormSubmit = (products: IWithModelItem[], action: ProductsActions) => {
        switch (action) {
            default:
                console.log(products, action);
        }
    };

    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ProductsFilter onSubmit={handleFiltersSubmit} />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <ProductsActionsForm products={selectedProducts} onSubmit={handleProductsActionFormSubmit} />
                <ProductsTable
                    onProductsSelect={setSelectedProducts}
                    tableData={data!}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                />
            </Grid>
        </Grid>
    );
};

export default ProductsWithQualityModel;
