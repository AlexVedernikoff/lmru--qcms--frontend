const initialBody = {
    pageIndex: 0,
    pageSize: 20,
    sortField: 'createdAt',
    sortDirection: 'DESC',
    searchBy: {},
};

export const prepareBody = productsDocumentsFiltersState => {
    const requsetBody = {...initialBody};
    const {productNumberKey, productNumberValue, supplierNameKey, supplierNameValue} = productsDocumentsFiltersState;
    requsetBody.searchBy = {
        [productNumberKey]: productNumberValue,
        [supplierNameKey]: supplierNameValue,
        ...productsDocumentsFiltersState,
    };
    delete requsetBody.searchBy.productNumberKey;
    delete requsetBody.searchBy.productNumberValue;
    delete requsetBody.searchBy.supplierNameKey;
    delete requsetBody.searchBy.supplierNameValue;

    return requsetBody;
};