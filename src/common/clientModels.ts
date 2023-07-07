import {IconComponent} from '@fronton/icons-react';

export type TWithReactKey<P = unknown> = P & {key: React.Key};

export interface ITaskListItem {
    taskType: string;
    taskStatus: string;
    documents: string;
    productCode: string;
    productName: string;
    providerName: string;
    providerCode: string;
    qualityStatus: string;
    QE: string;
    SQM: string;
    taskNumber: string;
    awaitedDocuments: string;
    taskCategory: string;
    creationDate: string;
    confirmationEndDate: string;
    responsibleContractor: string;
}

export interface IMasterPlanRequirementTableItem {
    status: string;
    category: {
        id?: number;
        name?: string;
    };
    type: {
        id?: number;
        name?: string;
    };
    legal: {
        id: number;
        name: string;
    }[];
    documents: {
        id: number;
        name: string;
    }[];
    origin: {
        id: number;
        name: string;
    }[];
    process: boolean;
    responsiblePerson: string;
    approvingPerson: string;
    documentTemplate: number;
    taskRequirement: boolean;
}

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

export interface IProductTableTransferItem {
    creationDate: string;
    productCodeAdeo: string;
    productCode: string;
    productName: string;
    providerName: string;
}

export interface IProviderTableItem {
    key: string | number;
    providerName: string;
    providerCode: number;
    providerCertified: string;
    providerWoodProducts: string;
}

export interface IProviderCommandTableItem {
    userServiceNumber: string;
    surname: string;
    name: string;
    email: string;
    activityTypeCode: string;
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
    code: string;
    SupplierBindingStatus: string;
    SupplierLink: string;
    EAN: string;
    ComplianceStatusBU: string;
}

export interface IProviderTableWithDocuments {
    documentNumber: string;
    type: string;
    productCode: number;
    EAN: number;
    TNVED: number;
    name: string;
    releaseDate: string;
    endDate: string;
    status: string;
    confirmationStatus: string;
    uploadDate: string;
    nameSupplier: string;
    supplieroCodeRMS: number;
    INN: number;
    businessLicenseNumber: number;
    SSMCode: number;
    role: string;
    downloadCompleted: string;
}

export interface ITaskTableNotification {
    date: string;
    topic: string;
    templateName: string;
    recipient: string;
    text: string;
}

export interface ITaskTableTasks {
    taskNumber: number;
    EAN: number;
    providerLink: string;
    matrixId: string;
    documentStatus: string;
    shopCode: number;
    product: string;
    taskStatus: string;
}

export interface IItemListTodo {
    label: string;
    value: number;
    valueImportant?: number;
    icon?: IconComponent | React.FC;
    isLoading?: boolean;
    isError?: boolean;
}

export interface ITaskAwaitingDocument {
    documentName: string;
    documentType: string;
    template: string;
    comment: string;
}

export interface ITaskUploadedDocument {
    documentType: string;
    documentMask: string;
    status: string;
    documentName: string;
    partial: boolean;
    uploadDate: string;
    startDate: string;
    endDate: string;
    uploaderName: string;
}
