import {createSlice} from '@reduxjs/toolkit';

enum EComplianceStatusValues {
    'APPROVED' = 'APPROVED',
    'REJECTED' = 'REJECTED',
    'NEEDS_APPROVAL' = 'NEEDS_APPROVAL',
}
export enum EDateType {
    'CREATED' = 'CREATED',
    'UPDATED' = 'UPDATED',
    'ISSUE' = 'ISSUE',
    'EXPIRY' = 'EXPIRY',
}

interface IDates {
    dateType: EDateType;
    startDate: string;
    endDate: string;
}

export interface IFilters {
    productNumberKey: string;
    productNumberValue: string;
    approvingStatus: [EComplianceStatusValues] | undefined;
    supplierNameKey: string;
    supplierNameValue: string;
    regulatoryStatus: string[] | undefined;
    type: string[] | undefined;
    fileName: string | undefined;
    status: string[] | undefined;
    dates: IDates;
    country: string;
    modelDepartmentId: string[] | undefined;
    modelSubDepartmentId: string[] | undefined;
    modelConsolidationId: string[] | undefined;
    modelCodeId: string[] | undefined;

    productManagementNomenclatureDepartmentId: string[] | undefined;
    productManagementNomenclatureSubdepartmentId: string[] | undefined;
    productManagementNomenclatureTypeId: string[] | undefined;
    productManagementNomenclatureSubtypeId: string[] | undefined;

    qualityModelId: [number | undefined | string];
}

export const initialState: IFilters = {
    productNumberKey: 'productCode',
    productNumberValue: '',
    approvingStatus: undefined,
    supplierNameKey: 'supplierName',
    supplierNameValue: '',
    regulatoryStatus: undefined,
    type: undefined,
    fileName: undefined,
    status: undefined,
    dates: {
        dateType: EDateType.CREATED,
        startDate: '',
        endDate: '',
    },
    country: '9',

    modelDepartmentId: undefined,
    modelSubDepartmentId: undefined,
    modelConsolidationId: undefined,
    modelCodeId: undefined,

    productManagementNomenclatureDepartmentId: undefined,
    productManagementNomenclatureSubdepartmentId: undefined,
    productManagementNomenclatureTypeId: undefined,
    productManagementNomenclatureSubtypeId: undefined,

    qualityModelId: [''],
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
