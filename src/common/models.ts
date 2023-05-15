export interface IModelTableItem {
    modelStatus: string;
    modelCode: string;
    qualityModel: string;
    QE: {
        fullName: string;
        type: 'QE' | 'SCM';
    }[];
    nomenclature: {
        code: string;
        description: string;
    }[];
    latestChange: string;
    changeDate: string;
}

export interface IProductTableWithModelsItem {
    providerStatus: string;
    productCode: number;
    productName: string;
    providerCode: number;
    providerName: string;
    qualityStatus: string;
    /* additional data */
    QE: string;
    qualityModel: string;
    EAN: string;
    lastProductStatusDate: string;
    qualityModelNumber: string;
    qualityModelManager: string;
    productDataCompleteness: string;
    productTopAVS: string;
    productCreationDate: string;
    productActionsBy: string;
    departmentCode: string;
    subDepartmentCode: string;
    TN_VED_Code: string;
    departmentName: string;
    nomenclature: string;
}

export interface IProductTableWithoutModelsItem {
    providerCodeNumber: number;
    productCode: number;
    productName: string;
    params: string;
}

export interface IProviderTableItem {
    providerName: string;
    providerCode: number;
    providerCertified: string;
    providerWoodProducts: string;
}

export interface IProviderCommandTableItem {
    userServiceNumber: number;
    surname: string;
    name: string;
    email: string;
    activityTypeCode: number;
}

export interface IProviderContactsTableItem {
    surname: string;
    name: string;
    email: string;
    telephone: string;
    mobile: string;
    type: string;
}

export interface IProviderProductsTableItem {
    name: string;
    code: number;
    SupplierBindingStatus: string;
    SupplierLink: string;
    EAN: number;
    ComplianceStatusBU: string;
}