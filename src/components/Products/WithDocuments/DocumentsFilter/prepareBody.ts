import {IFilters} from '../../../../store/slices/productsDocumentsSlice';

const initialBody = {
    pageIndex: 0,
    pageSize: 1,
    sortField: 'expireDate',
    sortDirection: 'ASC',
    searchBy: {},
};

export const prepareBody = (productsDocumentsFiltersState: IFilters) => {
    const requsetBody: any = {...initialBody};
    const {searchBy} = requsetBody;

    const {productNumberKey, productNumberValue, supplierNameKey, supplierNameValue, dates} =
        productsDocumentsFiltersState;

    const {dateType, startDate, endDate} = dates;
    const newDateArr = ['createDate', 'updateDate'];

    requsetBody.searchBy = {
        [productNumberKey]: productNumberValue,
        [supplierNameKey]: supplierNameValue,
        [String(dateType)]:
            startDate && endDate
                ? {
                      'Start date for search (After)': newDateArr.includes(String(dateType))
                          ? new Date(startDate)
                          : startDate,
                      'End date for search (Before)': newDateArr.includes(String(dateType))
                          ? new Date(endDate)
                          : endDate,
                  }
                : undefined,
        ...productsDocumentsFiltersState,
    };
    delete requsetBody.searchBy.productNumberKey;
    delete requsetBody.searchBy.productNumberValue;
    delete requsetBody.searchBy.supplierNameKey;
    delete requsetBody.searchBy.supplierNameValue;
    delete requsetBody.searchBy.dates;

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
