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

const j = {
    productDescription: 'string',
    productCode: 'string',
    productTNVEDcode: 'string',
    ean: 'string',
    // *******************
    supplierRMSCode: 'string',
    supplierName: 'string',
    supplierTaxIdentifer: 'string',
    // *******************
    productManagementNomenclatureDepartmentId: [0],
    productManagementNomenclatureSubdepartmentId: [0],
    productManagementNomenclatureTypeId: [0],
    productManagementNomenclatureSubtypeId: [0],
    // *******************
    productModelNomenclatureDepartmentId: ['string'],
    productModelNomenclatureSubdepartmentId: ['string'],
    productModelNomenclatureConsolidationId: ['string'],
    productModelNomenclatureCodeId: ['string'],
};

// approvedBy исчезло.
// наименование поставщика (второй фильтр) исчезло
// productDescription: - это товарные номера наименование?
// модель качества qualityModelId?
