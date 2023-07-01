import {ISuppliersFilter} from '../../../../store/slices/suppliersFilterSlice';

const initialBody = {
    pageIndex: 0,
    pageSize: 10,
    searchBy: {},
};

export const prepareBody = (suppliersFilterState: ISuppliersFilter) => {
    const requsetBody: any = {...initialBody};

    const {supplierKey, supplierValue, pageable} = suppliersFilterState;

    // const {dateType, startDate, endDate} = dates;
    // const newDateArr = ['createDate', 'updateDate'];

    requsetBody.pageIndex = pageable.pageIndex;

    requsetBody.searchBy = {
        [supplierKey]: supplierValue,
        ...suppliersFilterState,
    };

    // if (dateType) {
    //     requsetBody.searchBy[String(dateType)] =
    //         startDate && endDate
    //             ? {
    //                   'Start date for search (After)': newDateArr.includes(String(dateType))
    //                       ? new Date(startDate)
    //                       : startDate,
    //                   'End date for search (Before)': newDateArr.includes(String(dateType))
    //                       ? new Date(endDate)
    //                       : endDate,
    //               }
    //             : undefined;
    // }

    delete requsetBody.searchBy.supplierKey;
    delete requsetBody.searchBy.supplierValue;
    // delete requsetBody.searchBy.dates;
    delete requsetBody.searchBy.pageable;

    return requsetBody;
};
