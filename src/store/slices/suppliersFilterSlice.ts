import {createSlice} from '@reduxjs/toolkit';

export interface ISuppliersFilter {
    supplierKey: string;
    supplierValue: string | undefined;
    registrationStatus: string | undefined;
    billingCountry: string | undefined;
    supplierDepartmentCountry: string | undefined;
}

export const initialState: ISuppliersFilter = {
    supplierKey: 'supplierName',
    supplierValue: undefined,
    registrationStatus: undefined,
    billingCountry: undefined,
    supplierDepartmentCountry: undefined,
};

export const suppliersFilter = createSlice({
    name: 'data/filters',
    initialState,
    reducers: {
        setSuppliersFilter(state: ISuppliersFilter, action) {
            const [value, key]: [string | string[], string] = action.payload;
            return {...state, [key]: value};
        },
    },
});

export const {setSuppliersFilter} = suppliersFilter.actions;
