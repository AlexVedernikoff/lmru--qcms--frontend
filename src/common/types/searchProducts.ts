import {IPageable} from './common';

export interface ISearchProductsRequest {
    pageIndex?: number;
    pageSize?: number;
    sortField?: string;
    sortDirection?: string;
    searchBy: SearchBy;
}

interface SearchBy {
    code?: string;
    adeoCode?: string;
    description?: string;
    ean?: string;
    supplierCode?: string;
    supplierName?: string;
    supplierTaxIdentifier?: string;
    productManagementNomenclature?: ProductManagementNomenclatureReq[];
    productModelNomenclature?: ProductModelNomenclatureReq[];
    qualityModelId?: number;
    range?: string;
    buCode?: number[];
    withQualityModel?: boolean;
    mdd?: boolean;
    import?: boolean;
    attributes?: Attributes;
    project?: boolean;
    blockType?: string;
    productWithSubstances?: string;
    regulatoryStatuses?: string[];
    conformityStatuses?: string[];
}

interface Attributes {
    attributeCode?: string;
    values?: string[];
}

interface ProductManagementNomenclatureReq {
    departmentId?: number;
    subDepartmentId?: number;
    typeId?: number;
    subTypeId?: number;
}

interface ProductModelNomenclatureReq {
    modelDepartmentId?: string;
    modelSubDepartmentId?: string;
    modelConsolidationId?: string;
    modelCodeId?: string;
}

export interface ISearchProductsResponse {
    pageable: IPageable;
    content: Content[];
    pageIndex: number;
    pageSize: number;
}

interface Content {
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
    uploadedDocuments: number[];
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
}

interface ProductManagementNomenclature {
    departmentId: number;
    subDepartmentId: number;
    typeId: number;
    subTypeId: number;
}

interface ProductModelNomenclature {
    modelDepartmentId: number;
    modelSubDepartmentId: number;
    modelConsolidationId: number;
    modelCodeId: number;
}

interface QualityStatus {
    qualityStatus: string;
    qualityStatusComment: string;
    qualityStatusHistory: History[];
    buCode: number;
    targetBuCode: number;
    sellingBlockHistory: History[] | null;
    orderBlockHistory: History[] | null;
    publicationBlockHistory: History[] | null;
    startDateForPublicationBlock: Date;
    endDateForPublicationBlock: Date | null;
    startDateForSellingBlock: Date;
    endDateForSellingBlock: Date | null;
    startDateForOrderBlock: Date;
    endDateForOrderBlock: Date | null;
    blockedForOrder: boolean;
    blockedForPublication: boolean;
    blockedForSelling: boolean;
}

interface History {
    id: number;
    currentValue: string;
    previousValue: string;
    statusUpdatedAt: Date;
    statusUpdatedBy: string;
    comment: string;
}
