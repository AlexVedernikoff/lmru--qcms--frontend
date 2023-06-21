const initialBody = {
    pageIndex: 0,
    pageSize: 1,
    sortField: 'expireDate',
    sortDirection: 'ASC',
    searchBy: {},
};

export const prepareBody = productsDocumentsFiltersState => {
    const requsetBody = {...initialBody};
    const {searchBy} = requsetBody;
    const {documentType, documentName, status, approvingStatus} = productsDocumentsFiltersState;

    searchBy.type = documentType;
    searchBy.status = status;
    searchBy.fileName = documentName || undefined;
    searchBy.approvingStatus = approvingStatus;

    // const {productNumberKey, productNumberValue, supplierNameKey, supplierNameValue} = productsDocumentsFiltersState;
    // requsetBody.searchBy = {
    //     [productNumberKey]: productNumberValue,
    //     [supplierNameKey]: supplierNameValue,
    //     ...productsDocumentsFiltersState,
    // };
    // delete requsetBody.searchBy.productNumberKey;
    // delete requsetBody.searchBy.productNumberValue;
    // delete requsetBody.searchBy.supplierNameKey;
    // delete requsetBody.searchBy.supplierNameValue;

    return requsetBody;
};
