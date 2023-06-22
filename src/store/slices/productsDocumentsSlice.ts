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
    modelDepartmentId: string[] | undefined;
    modelSubDepartmentId: string[] | undefined;
    modelConsolidationId: string[] | undefined;
    modelCodeId: string[] | undefined;

    productManagementNomenclatureDepartmentId: string[] | undefined;
    productManagementNomenclatureSubdepartmentId: string[] | undefined;
    productManagementNomenclatureTypeId: string[] | undefined;
    productManagementNomenclatureSubtypeId: string[] | undefined;

    qualityModelId: number[] | undefined;
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

    modelDepartmentId: undefined,
    modelSubDepartmentId: undefined,
    modelConsolidationId: undefined,
    modelCodeId: undefined,

    productManagementNomenclatureDepartmentId: undefined,
    productManagementNomenclatureSubdepartmentId: undefined,
    productManagementNomenclatureTypeId: undefined,
    productManagementNomenclatureSubtypeId: undefined,

    qualityModelId: undefined,
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
