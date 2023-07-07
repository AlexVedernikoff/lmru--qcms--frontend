import {createSlice} from '@reduxjs/toolkit';
import {ISearchSuppliersResponse} from '../../common/types/searchSuppliers';

const initialState = {
    pageable: {
        pageSize: 0,
        pageIndex: 10,
    },
    content: [],
    isLoading: true,
};

export const suppliersTableData = createSlice({
    name: 'data/suppliersDocumentsTable',
    initialState,
    reducers: {
        setSuppliersTableData(state: ISearchSuppliersResponse, action) {
            const {data, isLoading} = action.payload;
            return {...data, isLoading};
        },
        setSuppliersLoading(state: ISearchSuppliersResponse, action) {
            state.isLoading = action.payload;
        },
    },
});

export const {setSuppliersTableData, setSuppliersLoading} = suppliersTableData.actions;
