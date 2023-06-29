import {IProduct, IProductsRequest, IProductsResponse} from '../../../../common/types/products';
import withoutModelApi from '../withoutModelApi';
import {useState} from 'react';
import {Grid} from 'fronton-react';
import ProductsTable from '../ProductsTable';
import ProductsSelectQualityModelForm from '../ProductsSelectQualityModelForm';

import styles from '../../../Common.module.css';

interface Props {
    searchBy: IProductsRequest['body']['searchBy'];
    productManagementNomenclatureDepartmentId: number;
}

const ProductsSetQualityModelForm: React.FC<Props> = ({searchBy, productManagementNomenclatureDepartmentId}) => {
    const title = `Товары из департамента № ${productManagementNomenclatureDepartmentId}`;

    const [page, setPage] = useState<Pick<IProductsRequest['body'], 'pageSize' | 'pageIndex'>>({
        pageSize: 10,
        pageIndex: 0,
    });

    const [sort] = useState<Pick<IProductsRequest['body'], 'sortField' | 'sortDirection'>>({
        // sortField: 'createdAt',
        sortDirection: 'DESC',
    });

    const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]);

    const getProductsQuery = withoutModelApi.useGetProductsQuery({
        header: {
            securityCode: 'security_code',
        },
        body: {
            ...page,
            ...sort,
            searchBy: {
                ...searchBy,
                productManagementNomenclature: [{departmentId: productManagementNomenclatureDepartmentId}],
            },
        },
    });

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex: pageIndex - 1, pageSize});
    };

    const [productsWithQualityModelIds, setProductsWithQualityModelIds] = useState<number[]>([]); // Айдишики тех продуктов, которым назначили модель качества.

    // К сожалению, метод для получения списка товаров иногда возвращает объект, содержащий в себе массив товаров, а иногда - пустой массив. Поэтому, пока ребята не починят бэк, приходится использовать "!Array.isArray".
    const tableData: IProductsResponse =
        getProductsQuery.data && !Array.isArray(getProductsQuery.data)
            ? {
                  content: getProductsQuery.data.content.filter(({id}) => !productsWithQualityModelIds.includes(id)),
                  pageable: getProductsQuery.data.pageable,
              }
            : {
                  content: [],
                  pageable: {
                      pageSize: 0,
                      pageIndex: 0,
                      totalPages: 0,
                      totalElements: 0,
                  },
              };

    const [updateProductsQualityModelId] = withoutModelApi.useUpdateProductsMutation();

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

    return (
        <Grid rowGap={16} className={styles.panel}>
            <ProductsSelectQualityModelForm
                products={selectedProducts}
                onSubmit={handleQualityModelSelectSubmit}
                title={title}
            />
            <ProductsTable
                onProductsSelect={setSelectedProducts}
                tableData={tableData}
                onPageChange={handlePageChange}
                isLoading={getProductsQuery.isLoading}
            />
        </Grid>
    );
};

export default ProductsSetQualityModelForm;
