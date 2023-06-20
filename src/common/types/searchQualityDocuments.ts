export interface IQualityDocumentsRequest {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection: string;
    searchBy: SearchBy;
}

interface SearchBy {
    productCode?: string;
    productDescription?: string;
    ean?: string;
    productTNVEDcode?: string;
    regulatoryStatus?: string[];
    supplierRMSCode?: string;
    supplierName?: string;
    supplierTaxIdentifer?: string;
    supplierBusinessLicense?: string;
    departmentId?: number[];
    subDepartmentId?: number[];
    typeId?: number[];
    subTypeId?: number[];
    modelDepartmentId?: string[];
    modelSubDepartmentId?: string[];
    modelConsolidationId?: string[];
    modelCodeId?: string[];
    qualityModelId?: number[];
    type?: string[];
    fileName?: string;
    status?: string[];
    approvingStatus?: string[];
    dates?: DatesClass;
    buCodes?: number[];
}

interface DatesClass {
    dateType: string;
    startDate: string;
    endDate: string;
}
