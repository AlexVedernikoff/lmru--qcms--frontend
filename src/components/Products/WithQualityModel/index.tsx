import {Grid} from 'fronton-react';
import ProductsFilter, {IFilterFormState} from './ProductsFilter';
import ProductsTable from './ProductsTable';
import styles from '../../Common.module.css';
import withModelApi from './withModelApi';
import {useState} from 'react';
import ProductsActionsForm from './ProductsActionsForm';
import {IProduct, IProductsRequest} from '../../../common/types/products';

const ProductsWithQualityModel: React.FC = () => {
    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

    const [page, setPage] = useState<Pick<IProductsRequest['body'], 'pageSize' | 'pageIndex'>>({
        pageSize: 10,
        pageIndex: 0,
    });

    const [sort] = useState<Pick<IProductsRequest['body'], 'sortField' | 'sortDirection'>>({
        // sortField: 'createdAt',
        sortDirection: 'DESC',
    });

    const [searchBy, setSearchBy] = useState<IProductsRequest['body']['searchBy']>({});

    const {data, isLoading} = withModelApi.useGetProductsQuery({
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
            dates: filters.dateType
                ? {
                      dateType: filters.dateType,
                      startDate: filters.startDate,
                      endDate: filters.endDate,
                  }
                : undefined,
        }));
    };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex: pageIndex - 1, pageSize});
    };

    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ProductsFilter onSubmit={handleFiltersSubmit} />
            </Grid>

            <Grid className={styles.panel}>
                <ProductsActionsForm products={selectedProducts} />
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
