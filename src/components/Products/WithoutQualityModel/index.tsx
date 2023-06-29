import {Grid} from 'fronton-react';
import ProductsFilter, {FilterType, IFilterFormState} from './ProductsFilter';
import {useState} from 'react';
import {IProductsRequest} from '../../../common/types/products';
import ProductsSetQualityModelForm from './ProductsSetQualityModelForm';

export const productManagementNomenclatureDepartmentIdValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const ProductsWithoutQualityModel: React.FC = () => {
    const [searchBy, setSearchBy] = useState<IProductsRequest['body']['searchBy']>({
        withQualityModel: false,
    });

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

    return (
        <Grid rowGap={16}>
            <ProductsFilter onSubmit={handleFiltersSubmit} />

            {productManagementNomenclatureDepartmentIdValues.map(productManagementNomenclatureDepartmentId => (
                <ProductsSetQualityModelForm
                    key={productManagementNomenclatureDepartmentId}
                    productManagementNomenclatureDepartmentId={productManagementNomenclatureDepartmentId}
                    searchBy={searchBy}
                />
            ))}
        </Grid>
    );
};

export default ProductsWithoutQualityModel;
