interface IProductManagementNomenclature {
    departmentId: number;
    subdepartmentId: number;
    subtypeId: number;
    typeId: number;
}

interface IProductModelNomenclature {
    departmentId?: string;
    subdepartmentId?: string;
    consolidationId?: string;
    codeId?: string;
}

interface IProductInfoDetail {
    approvingStatus: string;
    productId: number;
    productDescription: string;
    productCode: string;
    productTNVEDCode?: string;
    ean: string;
    supplierId: number;
    supplierRMSCode: string;
    supplierName: string;
    supplierTaxIdentifier: string;
    qualityActionId: number;
    productManagementNomenclature: IProductManagementNomenclature;
    productModelNomenclature: IProductModelNomenclature;
    buCodes: string[];
}

export interface IDocumentMetaData {
    type: string;
    isTemplate: boolean;
    isForLot: boolean;
    createdBy: string;
    fileName?: string;
    fileLink?: string;
    mask?: string;
    issueDate?: string;
    expireDate?: string;
    rosAccreditationApproveStatus?: string;
    productsDetails?: IProductInfoDetail[];
}
