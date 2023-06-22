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
    const {
        productNumberKey,
        productNumberValue,
        supplierNameKey,
        supplierNameValue,
        type, // documentType в предыдущей документации. Фильтр "04 Тип документа"
        fileName, // documentName в предыдущей документации. Фильтр "05 имя файла fileName"
        status, // Фильтр "06 Статус документа " enum ["ACTIVE", "INACTIVE"]
        approvingStatus, // Фильтр "07 Статус соответствия"
        regulatoryStatus, // Фильтр 03 "Регуляторный статус"
    } = productsDocumentsFiltersState;

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

const searchByJSON = {
    type: ['string'], // documentType в предыдущей документации
    regulatoryStatus: ['string'],
    // *******************
    productDescription: 'string',
    productCode: 'string',
    productTNVEDcode: 'string',
    ean: 'string',
    // *******************
    supplierRMSCode: 'string',
    supplierName: 'string',
    supplierTaxIdentifer: 'string',
    supplierBusinessLicense: 'string', // optional
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

// approvedBy исчезло.  !скрыть
// qe скрыть.
