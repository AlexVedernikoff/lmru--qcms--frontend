export interface IQualityProductDetailsParams {
    productId: string;
    securityCode: string;
}

export interface ProductDetails {
    id: number;
    code: string;
    version: number;
    productManagementNomenclature: ProductManagementNomenclature;
    qualityModelId: string;
    productModelNomenclature: ProductModelNomenclature;
    adeoCode: string;
    description: string;
    category: string;
    brand: string;
    range: string;
    status: string;
    customId: string;
    projectId: string;
    productAVSDate: Date;
    buCode: any[];
    ean: string;
    regulatoryStatus: string;
    supplierCode: string;
    uploadedDocuments: QualityAction[];
    qualityActionIds: number[];
    qualityStatuses: QualityStatus[];
    productAttributes: any[];
    productWithSubstances: boolean;
    project: boolean;
    multipleModel: boolean;
    import: boolean;
    sample: boolean;
    topAVS: boolean;
    mdd: boolean;
    topReferencment: boolean;
    top1000: boolean;
    topDeleted: boolean;
    qualityModel: QualityModel;
    qualityActions: QualityAction[];
}

export interface ProductManagementNomenclature {
    departmentId: number;
    subDepartmentId: number;
    typeId: number;
    subTypeId: number;
}

export interface ProductModelNomenclature {
    modelDepartmentId: number;
    modelSubDepartmentId: number;
    modelConsolidationId: number;
    modelCodeId: number;
}

export interface QualityAction {
    id: number;
    actionStatus: string;
    version: number;
    targetBuCodes: number[];
    conclusion: string;
    isForUpdate: string;
    isOverdue: boolean;
    categoryName: string;
    categoryTypeName: string;
    realisationDueDate: Date;
    approvalDueDate: Date;
    approvers: Approver[];
    responsible: Approver[];
    supplierData: SupplierData;
    product: Product;
    publicComments: PublicComment[];
    documents: Documents;
    creationInformation: CreationInformation;
    lastUpdateInformation: LastUpdateInformation;
}

export interface Approver {
    type: string;
    externalId: string;
}

export interface CreationInformation {
    createdAt: Date;
    createdBy: string;
}

export interface Documents {
    uploadedDocuments: any[];
}

export interface LastUpdateInformation {
    updatedAt: Date;
    updatedBy: string;
}

export interface Product {
    id: number;
    name: string;
    code: string;
    ean: string;
    isFromProject: boolean;
    productRange: string;
    qualityModel: string;
    regulatoryStatus: string;
    adeoRisk: string;
}

export interface PublicComment {
    id: number;
    order: number;
    comment: string;
    createdAt: Date;
    createdBy: string;
}

export interface SupplierData {
    id: number;
    name: string;
    supplierRMSCode: string;
    supplierAdeoCode: string;
    supplierTaxIdentifier: string;
}

export interface QualityModel {
    id: number;
    qualityModelLabel: string;
    documentVersion: number;
    qualityModelStatus: string;
    qualityModelFullName: string;
    productModelNomenclature: QualityModelProductModelNomenclature;
    assignedApprovers: any[];
    qualityModelForMixtures: boolean;
    qualityModelDescription: string;
    productGroupRisks: ProductGroupRisks;
    regulatoryReferenceIds: number[];
    masterPlanIds: number[];
    creationInformation: CreationInformation;
    lastUpdateInformation: LastUpdateInformation;
}

export interface ProductGroupRisks {
    productRiskLevel: number;
    personLevelRiskForCorrectUsage: number;
    personLevelRiskForNonCorrectUsage: number;
    sustainabilityRisk: number;
    regulatoryRisk: number;
    healthRisk: number;
    calculatedRisk: string;
    riskComments: string;
}

export interface QualityModelProductModelNomenclature {
    id: number;
    departmentCode: string;
    departmentName: string;
    subDepartmentCode: string;
    subDepartmentName: string;
    modelConsolidationCode: string;
    modelConsolidationName: string;
    modelCode: string;
    modelName: string;
}

export interface QualityStatus {
    qualityStatus: string;
    qualityStatusComment: string;
    qualityStatusHistory: History[];
    buCode: number;
    targetBuCode: number;
    sellingBlockHistory: History[];
    orderBlockHistory: History[];
    publicationBlockHistory: History[];
    startDateForPublicationBlock: Date;
    endDateForPublicationBlock: null;
    startDateForSellingBlock: Date;
    endDateForSellingBlock: null;
    startDateForOrderBlock: Date;
    endDateForOrderBlock: null;
    blockedForOrder: boolean;
    blockedForPublication: boolean;
    blockedForSelling: boolean;
}

export interface History {
    id: number;
    currentValue: string;
    previousValue: string;
    statusUpdatedAt: Date;
    statusUpdatedBy: string;
    comment: string;
}

interface IqStatuses {
    id: string;
    bu: string;
    statuses: string[];
    blockOrders: boolean;
    blockSellings: boolean;
    blockPublics: boolean;
    prevStatus: string;
    curentStatus?: string;
    isStatusCommentOpened: boolean;
    statusComment: string;
}

export interface IDataDeatailsQstatus extends IqStatuses {
    key: React.Key;
}
