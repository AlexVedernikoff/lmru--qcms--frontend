import {createSlice} from '@reduxjs/toolkit';

export interface IPageable {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: string;
}

export interface ISuppliersFilter {
    supplierKey: string;
    supplierValue: string | undefined;
    registrationStatus: string | undefined;
    billingCountry: string | undefined;
    supplierDepartmentCountry: string | undefined;
    qualityRating: string | undefined;

    productModelNomenclatureDepartmentId: string[] | undefined;
    productModelNomenclatureSubdepartmentId: string[] | undefined;
    productModelNomenclatureConsolidationId: string[] | undefined;
    productModelNomenclatureCodeId: string[] | undefined;

    productManagementNomenclatureDepartmentId: number[] | undefined;
    productManagementNomenclatureSubdepartmentId: number[] | undefined;
    productManagementNomenclatureTypeId: number[] | undefined;
    productManagementNomenclatureSubtypeId: number[] | undefined;
    pageable: IPageable;
}

export const initialState: ISuppliersFilter = {
    supplierKey: 'supplierName',
    supplierValue: undefined,
    registrationStatus: undefined,
    billingCountry: undefined,
    supplierDepartmentCountry: undefined,
    qualityRating: undefined,

    productModelNomenclatureDepartmentId: undefined,
    productModelNomenclatureSubdepartmentId: undefined,
    productModelNomenclatureConsolidationId: undefined,
    productModelNomenclatureCodeId: undefined,

    productManagementNomenclatureDepartmentId: undefined,
    productManagementNomenclatureSubdepartmentId: undefined,
    productManagementNomenclatureTypeId: undefined,
    productManagementNomenclatureSubtypeId: undefined,

    pageable: {
        pageIndex: 0,
        pageSize: 10,
    },
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