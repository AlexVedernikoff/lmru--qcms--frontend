import {createSlice} from '@reduxjs/toolkit';
import {ISearchSuppliersResponse} from '../../common/types/searchSuppliers';

const initialState = {
    pageable: {
        pageSize: 0,
        pageIndex: 10,
    },
    content: [],
};

export const suppliersTableData = createSlice({
    name: 'data/suppliersDocumentsTable',
    initialState,
    reducers: {
        setSuppliersTableData(state: ISearchSuppliersResponse, action) {
            return {...action.payload.data};
        },
    },
});

export const {setSuppliersTableData} = suppliersTableData.actions;
