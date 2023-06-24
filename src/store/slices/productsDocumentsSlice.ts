import {createSlice} from '@reduxjs/toolkit';

enum EApprovingStatusValues {
    'APPROVED' = 'APPROVED',
    'REJECTED' = 'REJECTED',
    'NEEDS_APPROVAL' = 'NEEDS_APPROVAL',
}

enum ERegulatoryStatusValues {
    'IMPORTER' = 'IMPORTER',
    'SUPPLIER' = 'SUPPLIER',
    'MANUFACTURER' = 'MANUFACTURER',
}

export enum EDateType {
    'createDate' = 'createDate',
    'updateDate' = 'updateDate',
    'issueDate' = 'issueDate',
    'expireDate' = 'expireDate',
}

interface IDates {
    dateType: EDateType | undefined;
    startDate: string;
    endDate: string;
}

export interface IPageable {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection: string;
}

export interface IFilters {
    productNumberKey: string;
    productNumberValue: string | undefined;

    supplierNameKey: string;
    supplierNameValue: string | undefined;

    approvingStatus: [EApprovingStatusValues] | undefined;
    regulatoryStatus: [ERegulatoryStatusValues] | undefined;

    type: string[] | undefined;
    fileName: string | undefined;
    status: string[] | undefined;
    dates: IDates;
    country: string | undefined;

    productModelNomenclatureDepartmentId: string[] | undefined;
    productModelNomenclatureSubdepartmentId: string[] | undefined;
    productModelNomenclatureConsolidationId: string[] | undefined;
    productModelNomenclatureCodeId: string[] | undefined;

    productManagementNomenclatureDepartmentId: number[] | undefined;
    productManagementNomenclatureSubdepartmentId: number[] | undefined;
    productManagementNomenclatureTypeId: number[] | undefined;
    productManagementNomenclatureSubtypeId: number[] | undefined;

    qualityModelId: number[] | undefined;
    pageable: IPageable;
}

export const initialState: IFilters = {
    productNumberKey: 'productCode',
    productNumberValue: undefined,

    supplierNameKey: 'supplierName',
    supplierNameValue: undefined,

    approvingStatus: undefined,
    regulatoryStatus: undefined,
    type: undefined,
    fileName: undefined,
    status: undefined,
    dates: {
        dateType: undefined,
        startDate: '',
        endDate: '',
    },
    country: undefined,

    productModelNomenclatureDepartmentId: undefined,
    productModelNomenclatureSubdepartmentId: undefined,
    productModelNomenclatureConsolidationId: undefined,
    productModelNomenclatureCodeId: undefined,

    productManagementNomenclatureDepartmentId: undefined,
    productManagementNomenclatureSubdepartmentId: undefined,
    productManagementNomenclatureTypeId: undefined,
    productManagementNomenclatureSubtypeId: undefined,

    qualityModelId: undefined,
    pageable: {
        pageIndex: 0,
        pageSize: 10,
        sortField: 'expireDate',
        sortDirection: 'ASC',
    },
};

export const productsDocumentsFilters = createSlice({
    name: 'data/filters',
    initialState,
    reducers: {
        setProductsDocumentsFilters(state: IFilters, action) {
            const [value, key]: [string | string[], string] = action.payload;
            return {...state, [key]: value};
        },
    },
});

export const {setProductsDocumentsFilters} = productsDocumentsFilters.actions;
