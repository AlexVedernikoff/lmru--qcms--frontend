import {IFilters} from '../../../../store/slices/productsDocumentsSlice';

const initialBody = {
    pageIndex: 4,
    pageSize: 5,
    sortField: 'expireDate',
    sortDirection: 'ASC',
    searchBy: {},
};

export const prepareBody = (productsDocumentsFiltersState: IFilters) => {
    const requsetBody: any = {...initialBody};

    const {productNumberKey, productNumberValue, supplierNameKey, supplierNameValue, dates} =
        productsDocumentsFiltersState;

    const {dateType, startDate, endDate} = dates;
    const newDateArr = ['createDate', 'updateDate'];

    requsetBody.searchBy = {
        [productNumberKey]: productNumberValue,
        [supplierNameKey]: supplierNameValue,
        ...productsDocumentsFiltersState,
    };

    if (dateType) {
        requsetBody.searchBy[String(dateType)] =
            startDate && endDate
                ? {
                      'Start date for search (After)': newDateArr.includes(String(dateType))
                          ? new Date(startDate)
                          : startDate,
                      'End date for search (Before)': newDateArr.includes(String(dateType))
                          ? new Date(endDate)
                          : endDate,
                  }
                : undefined;
    }

    delete requsetBody.searchBy.productNumberKey;
    delete requsetBody.searchBy.productNumberValue;
    delete requsetBody.searchBy.supplierNameKey;
    delete requsetBody.searchBy.supplierNameValue;
    delete requsetBody.searchBy.dates;

    return requsetBody;
};
