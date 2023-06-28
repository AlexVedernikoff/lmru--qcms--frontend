import {Grid} from 'fronton-react';
import styles from '../../Common.module.css';
import ProductsFilter, {FilterType, IFilterFormState} from './ProductsFilter';
import ProductsTable from './ProductsTable';
import ProductsSelectQualityModelForm from './ProductsSelectQualityModelForm';
import {useState} from 'react';
import withoutModelApi from './withoutModelApi';
import {IProduct, IProductsRequest, IProductsResponse} from '../../../common/types/products';

const ProductsWithoutQualityModel: React.FC = () => {
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

    const getProductsQuery = withoutModelApi.useGetProductsQuery({
        header: {
            securityCode: 'security_code',
        },
        body: {
            ...page,
            ...sort,
            searchBy,
        },
    });

    const [productsWithQualityModelIds, setProductsWithQualityModelIds] = useState<number[]>([]); // Айдишики тех продуктов, которым назначили модель качества.

    const [updateProductsQualityModelId] = withoutModelApi.useUpdateProductsMutation();

    const handleFiltersSubmit = (filters: IFilterFormState) => {
        setSearchBy(p => ({
            ...p,
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
            project: filters.project ? true : undefined,
            regulatoryStatus: filters.regulatoryStatus ? filters.regulatoryStatus : undefined,
            supplierName:
                filters.filterType === FilterType.SupplierName && filters.filterString
                    ? filters.filterString
                    : undefined,
            supplierTaxIdentifier:
                filters.filterType === FilterType.SupplierTaxIdentifier && filters.filterString
                    ? filters.filterString
                    : undefined,
            supplierCode:
                filters.filterType === FilterType.SupplierCode && filters.filterString
                    ? filters.filterString
                    : undefined,
        }));
    };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex: pageIndex - 1, pageSize});
    };

    const handleQualityModelSelectSubmit = (qualityModelId: string) => {
        const selectedProductsIds = selectedProducts.map(({id}) => id);
        setProductsWithQualityModelIds(prevState => [...prevState, ...selectedProductsIds]);
        updateProductsQualityModelId({
            header: {
                securityCode: 'security_code',
            },
            body: {
                updatedBy: 'Matvey',
                products: selectedProductsIds.map(id => ({id, qualityModelId})),
            },
        });
    };

    const tableData: IProductsResponse = {
        content: getProductsQuery.data?.content.filter(({id}) => !productsWithQualityModelIds.includes(id)) || [],
        pageable: getProductsQuery.data?.pageable || {
            pageSize: 0,
            pageIndex: 0,
            totalPages: 0,
            totalElements: 0,
        },
    };

    return (
        <Grid rowGap={16}>
            <ProductsFilter onSubmit={handleFiltersSubmit} />

            <Grid rowGap={16} className={styles.panel}>
                <ProductsSelectQualityModelForm products={selectedProducts} onSubmit={handleQualityModelSelectSubmit} />
                <ProductsTable
                    onProductsSelect={setSelectedProducts}
                    tableData={tableData}
                    onPageChange={handlePageChange}
                    isLoading={getProductsQuery.isLoading}
                />
            </Grid>
        </Grid>
    );
};

export default ProductsWithoutQualityModel;
