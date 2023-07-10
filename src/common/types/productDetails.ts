export interface IQualityProductDetailsParams {
    productId?: string;
    body?: IUpdateBodyReq;
}

export interface BodyUpdate {
    data: ProductDetails[];
}

export interface ProductDetails {
    id?: number;
    code?: string;
    version?: number;
    productManagementNomenclature?: ProductManagementNomenclature;
    qualityModelId?: string;
    productModelNomenclature?: ProductModelNomenclature;
    adeoCode?: string;
    description?: string;
    category?: string;
    brand?: string;
    range?: string;
    status?: string;
    customId?: string;
    projectId?: string;
    productAVSDate?: string;
    buCode?: any[];
    ean?: string;
    regulatoryStatus?: string;
    supplierCode?: string;
    uploadedDocuments?: UploadedDocument[];
    qualityActionIds?: number[];
    qualityStatuses?: QualityStatus[];
    productAttributes?: ProductAttribute[];
    creationInformation?: CreationInformation;
    lastUpdateInformation?: LastUpdateInformation;
    productWithSubstances?: boolean;
    import?: boolean;
    sample?: boolean;
    topAVS?: boolean;
    mdd?: boolean;
    topReferencment?: boolean;
    top1000?: boolean;
    topDeleted?: boolean;
    project?: boolean;
    multipleModel?: boolean;
    qualityModel?: QualityModel;
    qualityActions?: QualityAction[];
}
export interface UploadedDocument {
    id?: number;
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
    version?: number;
    creationInformation?: CreationInformation;
    lastUpdateInformation?: LastUpdateInformation;
    productsDetails?: ProductsDocDetail[];
}

export interface CreationInformation {
    createdAt?: string;
    createdBy?: string;
}

export interface LastUpdateInformation {
    updatedAt?: string;
    updatedBy?: string;
}

export interface ProductsDocDetail {
    id?: number;
    approvingStatus?: string;
    productId?: number;
    productDescription?: string;
    productCode?: string;
    productTNVEDCode?: string;
    ean?: string;
    supplierId?: number;
    supplierRMSCode?: string;
    supplierName?: string;
    supplierTaxIdentifier?: string;
    qualityActionId?: number;
    productManagementNomenclature?: ProductDocManagementNomenclature;
    productModelNomenclature?: ProductDocModelNomenclature;
    buCodes?: string[];
}

export interface ProductDocManagementNomenclature {
    departmentId?: number;
    subdepartmentId?: number;
    typeId?: number;
    subtypeId?: number;
}

export interface ProductDocModelNomenclature {
    departmentId?: string;
    subdepartmentId?: string;
    consolidationId?: string;
    codeId?: string;
}

export interface ProductAttribute {
    attributeCode?: string;
    attributeName?: string;
    values?: Value[];
}

export interface Value {
    code?: string;
    name?: string;
}

export interface ProductManagementNomenclature {
    departmentId?: number;
    subDepartmentId?: number;
    typeId?: number;
    subTypeId?: number;
}

export interface ProductModelNomenclature {
    modelDepartmentId?: number;
    modelSubDepartmentId?: number;
    modelConsolidationId?: number;
    modelCodeId?: number;
}

export interface QualityAction {
    id?: number;
    actionStatus?: string;
    version?: number;
    targetBuCodes?: number[];
    conclusion?: string;
    isForUpdate?: string;
    isOverdue?: boolean;
    categoryName?: string;
    categoryTypeName?: string;
    realisationDueDate?: Date;
    approvalDueDate?: string;
    approvers?: Approver[];
    responsible?: Approver[];
    supplierData?: SupplierData;
    product?: ProductUpdateData;
    publicComments?: PublicComment[];
    documents?: Documents;
    creationInformation?: CreationInformation;
    lastUpdateInformation?: LastUpdateInformation;
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
    type?: string;
    externalId?: string;
}

export interface Documents {
    awaitedDocuments?: QActionsAwaitedDocument[];
    uploadedDocuments?: QActionsUploadedDocument[];
}

export interface QActionsAwaitedDocument {
    type?: string;
    templateId?: string;
    linkedRegulations?: string[];
    requirementType?: string;
}

export interface QActionsUploadedDocument {
    id?: string;
    linkedTaskIds?: string[];
}

export interface ProductUpdateData {
    id?: number;
    name?: string;
    code?: string;
    ean?: string;
    isFromProject?: boolean;
    productRange?: string;
    qualityModel?: string;
    regulatoryStatus?: string;
    adeoRisk?: string;
}

export interface ProductsDetail {
    id?: number;
    approvingStatus?: string;
    productId?: number;
    productDescription?: string;
    productCode?: string;
    productTNVEDCode?: string;
    ean?: string;
    supplierId?: number;
    supplierRMSCode?: string;
    supplierName?: string;
    supplierTaxIdentifier?: string;
    qualityActionId?: number;
    productManagementNomenclature?: ProductsDetailProductManagementNomenclature;
    productModelNomenclature?: ProductsDetailProductModelNomenclature;
    buCodes?: string[];
}

export interface ProductsDetailProductManagementNomenclature {
    departmentId?: number;
    subdepartmentId?: number;
    typeId?: number;
    subtypeId?: number;
}

export interface ProductsDetailProductModelNomenclature {
    departmentId?: string;
    subdepartmentId?: string;
    consolidationId?: string;
    codeId?: string;
}

export interface PublicComment {
    id?: number;
    order?: number;
    comment?: string;
    createdAt?: string;
    createdBy?: string;
}

export interface SupplierData {
    id?: number;
    name?: string;
    supplierRMSCode?: string;
    supplierAdeoCode?: string;
    supplierTaxIdentifier?: string;
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
    qualityStatus?: string;
    qualityStatusComment?: string | null;
    qualityStatusHistory?: History[];
    buCode?: number;
    targetBuCode?: number;
    sellingBlockHistory?: History[];
    orderBlockHistory?: History[];
    publicationBlockHistory?: History[];
    startDateForPublicationBlock?: Date | null;
    endDateForPublicationBlock?: Date | null;
    startDateForSellingBlock?: Date | null;
    endDateForSellingBlock?: Date | null;
    startDateForOrderBlock?: Date | null;
    endDateForOrderBlock?: Date | null;
    blockedForOrder?: boolean;
    blockedForPublication?: boolean;
    blockedForSelling?: boolean;
}

export interface History {
    id?: number;
    currentValue?: string;
    previousValue?: string;
    statusUpdatedAt?: string;
    statusstring?: string;
    comment?: string;
}

interface IqStatuses {
    id: string;
    bu?: string;
    buCodeText?: string | number;
    statuses: string[];
    blockOrders?: boolean;
    blockOrdersComment: string;
    isBlockOrderOpened: boolean;
    isValidBlockOrders: boolean;
    blockSellings?: boolean;
    blockSellingsComment: string;
    isBlockSellingsOpened: boolean;
    isValidBlockSellings: boolean;
    blockPublics?: boolean;
    blockPublicsComment: string;
    isBlockPublicsOpened: boolean;
    isValidBlockPublics: boolean;
    ruStatus?: string;
    engStatus?: string;
    isStatusCommentOpened: boolean;
    statusComment: string;
    isValidStatus: boolean;
    isStatusHistoryOpened: boolean;
    isOrdersHistoryOpened: boolean;
    isSellingsHistoryOpened: boolean;
    isPublicationsHistoryOpened: boolean;
    statusRowHistory?: History[];
    ordersRowHistory?: History[];
    sellingsRowHistory?: History[];
    publicationsRowHistory?: History[];
}

export interface IDataDeatailsQstatus extends IqStatuses {
    key?: React.Key;
}

export interface IProductDeatilsProductMapping {
    customId?: string;
    regulatoryStatus?: string;
    riskOption?: string;
    qualityModelLabel: string;
    qualityModelId: string;
    productModelValueStr: string;
    code?: string;
    ean?: string;
    isChemical: boolean;
    isSTM: boolean;
    isImport: boolean;
    isFromProject: boolean;
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
    orderBlocking?: OrderBlocking;
    publicationBlocking?: PublicationBlocking;
    sellingBlocking?: SellingBlocking;
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

interface IProductDetailsTabDoc {
    type?: string;
    fileName?: string;
    arppovingStatus?: string;
    isForLot?: boolean;
    createdAt?: string;
    issueDate?: Date;
    expireDate?: Date;
    mask?: string;
    id?: string;
}

export interface IDataProductDetailsTabDoc extends IProductDetailsTabDoc {
    key?: React.Key;
}

interface IProductDetailsTabTasks {
    id?: string;
    categoryTypeName?: string;
    actionStatus?: string;
    uploadedDocumentId?: string;
    supDataName?: string;
    supDatasupplierRMSCode?: string;
    approversTypeQE?: string;
    approversTypeSQM?: string;
    tasks?: string;
    awaitedDocuments?: string;
    categoryName?: string;
    createdAt?: string;
    approvalDueDate?: string;
    responsible?: string;
    publicComments?: PublicComment[];
}

export interface IDataProductDetailsTabTasks extends IProductDetailsTabTasks {
    key?: React.Key;
}

export interface IQsearchModelsReq {
    pageIndex: number;
    pageSize: number;
    searchBy: ISearchBy;
}

export interface ISearchBy {
    productModelNomenclatureModelCode: string[];
}

export interface IQsearchModelsRes {
    pageable?: IQsearchModelsPageable;
    content?: IQsearchModelsContent[];
}

export interface IQsearchModelsContent {
    id?: number;
    qualityModelLabel?: string;
    documentVersion?: string;
    qualityModelStatus?: string;
    assignedApprovers?: IQsearchModelsContentAssignedApprover[];
    calculatedRisk?: string;
    qualityModelForMixtures?: boolean;
    productRiskLevel?: number;
    personLevelRiskForCorrectUsage?: number;
    personLevelRiskForNonCorrectUsage?: number;
    sustainabilityRisk?: number;
    healthRisk?: number;
    regulatoryRisk?: number;
    productModelNomenclatureDepartmentCode?: string;
    productModelNomenclatureSubDepartmentCode?: string;
    productModelNomeclatureConsolidationCode?: string;
    productModelNomenclatureModelCode?: string;
    creationInformation?: CreationInformation;
    lastUpdateInfomation?: LastUpdateInfomation;
}

export interface IQsearchModelsContentAssignedApprover {
    id?: number;
    userId?: string;
    buId?: number;
    role?: string;
}

export interface LastUpdateInfomation {
    updatedAt?: string;
    updatedBy?: string;
}

export interface IQsearchModelsPageable {
    pageSize?: number;
    pageIndex?: number;
    totalPages?: number;
    totalElements?: number;
}

export interface IQsearchModelsParams {
    productId?: string;
    body?: IQsearchModelsReq;
}
