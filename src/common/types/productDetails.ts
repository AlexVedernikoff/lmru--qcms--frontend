export interface IQualityProductDetailsParams {
    productId?: string;
    securityCode: string;
    body?: IUpdateBodyReq;
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
    productAttributes: ProductAttribute[];
    creationInformation: CreationInformation;
    lastUpdateInformation: LastUpdateInformation;
    productWithSubstances: boolean;
    import: boolean;
    sample: boolean;
    topAVS: boolean;
    mdd: boolean;
    topReferencment: boolean;
    top1000: boolean;
    topDeleted: boolean;
    project: boolean;
    multipleModel: boolean;
    qualityModel: QualityModel;
    qualityActions: QualityAction[];
}

export interface CreationInformation {
    createdAt: string;
    createdBy: string;
}

export interface LastUpdateInformation {
    updatedAt: Date;
    string: string;
}

export interface ProductAttribute {
    attributeCode: string;
    attributeName: string;
    values: Value[];
}

export interface Value {
    code: string;
    name: string;
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
    actionStatus?: string;
    version: number;
    targetBuCodes?: number[];
    conclusion?: string;
    isForUpdate?: string;
    isOverdue?: boolean;
    categoryName?: string;
    categoryTypeName?: string;
    realisationDueDate?: Date;
    approvalDueDate?: Date;
    approvers?: Approver[];
    responsible?: Approver[];
    supplierData?: SupplierData;
    product?: ProductUpdateData;
    publicComments?: PublicComment[];
    documents?: Documents;
    creationInformation: CreationInformation;
    lastUpdateInformation: LastUpdateInformation;
    type?: string;
    isTemplate?: boolean;
    status?: string;
    mask?: string;
    comment?: string | null;
    issueDate?: Date;
    expireDate?: Date;
    rosAccreditationApproveStatus?: string;
    isForLot?: boolean;
    fileName?: string;
    fileLink?: string;
    productsDetails?: ProductsDetail[];
}

export interface Approver {
    type: string;
    externalId: string;
}

export interface Documents {
    uploadedDocuments: any[];
}

export interface ProductUpdateData {
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

export interface ProductsDetail {
    id: number;
    approvingStatus: string;
    productId: number;
    productDescription: string;
    productCode: string;
    productTNVEDCode: string;
    ean: string;
    supplierId: number;
    supplierRMSCode: string;
    supplierName: string;
    supplierTaxIdentifier: string;
    qualityActionId: number;
    productManagementNomenclature: ProductsDetailProductManagementNomenclature;
    productModelNomenclature: ProductsDetailProductModelNomenclature;
    buCodes: string[];
}

export interface ProductsDetailProductManagementNomenclature {
    departmentId: number;
    subdepartmentId: number;
    typeId: number;
    subtypeId: number;
}

export interface ProductsDetailProductModelNomenclature {
    departmentId: string;
    subdepartmentId: string;
    consolidationId: string;
    codeId: string;
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
    masterPlanIds: any[];
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
    qualityStatusComment: string | null;
    qualityStatusHistory: History[];
    buCode: number;
    targetBuCode: number;
    sellingBlockHistory: History[];
    orderBlockHistory: History[];
    publicationBlockHistory: History[];
    startDateForPublicationBlock: Date | null;
    endDateForPublicationBlock: Date | null;
    startDateForSellingBlock: Date | null;
    endDateForSellingBlock: Date | null;
    startDateForOrderBlock: Date | null;
    endDateForOrderBlock: Date | null;
    blockedForOrder: boolean;
    blockedForPublication: boolean;
    blockedForSelling: boolean;
}

export interface History {
    id: number;
    currentValue: string;
    previousValue: string;
    statusUpdatedAt: Date;
    statusstring: string;
    comment: Comment;
}

interface IqStatuses {
    id: string;
    bu?: number;
    buCodeText?: string | number;
    statuses: string[];
    blockOrders?: boolean;
    blockSellings?: boolean;
    blockPublics?: boolean;
    ruStatus?: string;
    engStatus?: string;
    isStatusCommentOpened: boolean;
    statusComment: string;
}

export interface IDataDeatailsQstatus extends IqStatuses {
    key?: React.Key;
}

export interface ICommonProductFields {
    productId: string;
    productWithSubstances?: boolean;
    qualityModelId?: string;
}

export interface IUpdateBodyReq {
    updatedBy: string;
    products: ProductUpdateReq[];
}

export interface ProductUpdateReq {
    id: number;
    qualityModelId?: string;
    isProductWithSubstances?: boolean;
    quality?: ProductQualityUpdateReq;
}

export interface ProductQualityUpdateReq {
    buCode?: number;
    quality?: QualityIUpdateReq;
    orderBlocking: OrderBlocking;
    publicationBlocking: PublicationBlocking;
    sellingBlocking: SellingBlocking;
}

export interface OrderBlocking {
    blockedForOrdering?: boolean;
    orderBlockComment: string;
}

export interface PublicationBlocking {
    blockedForPublication?: boolean;
    publicationBlockComment: string;
}

export interface QualityIUpdateReq {
    qualityStatus?: string;
    comment: string;
}

export interface SellingBlocking {
    blockedForSelling?: boolean;
    sellingBlockComment: string;
}
