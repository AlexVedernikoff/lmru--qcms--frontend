export interface ISearchSuppliersResponse {
    pageable: Pageable;
    content: ISuppliersContent[];
}

interface Pageable {
    pageSize: number;
    pageIndex: number;
    totalPages?: number;
    totalElements?: number;
}

export interface ISuppliersContent {
    id?: number;
    version?: number;
    type?: string;
    status?: null | string;
    billingCountry?: string;
    registrationStatus?: string;
    supplierDepartmentCountry?: string;
    supplierSelfRatingPlatform?: string;
    supplierSelfRatingSQM?: string;
    manufacturingMonitoringPlatform?: string;
    manufacturingMonitoringManager?: string;
    country?: string;
    qualityRating?: string;
    technicalQualityRating?: string;
    ecologyQualityRating?: string;
    supplierCategory?: null | string;
    businessLicence?: string;
    supplierRMSCode?: string;
    supplierName?: string;
    supplierExName?: string;
    supplierInn?: string;
    supplierExternalCode?: string;
    buId: number[];
    supplierProjectTeam?: SupplierProjectTeam[];
    supplierContacts?: SupplierContact[];
    supplierDocuments?: SupplierDocument[];
    creationInformation?: CreationInformation;
    lastUpdateInformation: LastUpdateInformation;
}

interface SupplierProjectTeam {
    id: number;
    tabelNumber: string;
    surname: string;
    name: string;
    emailAddress: string;
    activityCode: string;
}

interface SupplierContact {
    id: number;
    surname: null | string;
    name: string;
    emailAddress: string;
    phoneNumber: string;
    mobilePhoneNumber: string;
    type?: string;
}

interface SupplierDocument {
    id: number;
    documentId: number;
}

interface CreationInformation {
    createdAt: Date | null;
    createdBy: string | null;
}

interface LastUpdateInformation {
    updatedAt: Date | null;
    updatedBy: string | null;
}

export interface ISearchSuppliersRequest {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: string;
    searchBy?: SearchBy;
}

interface SearchBy {
    id?: number;
    type?: string;
    version?: number;
    status?: string;
    billingCountry?: string;
    registrationStatus?: string;
    supplierDepartmentCountry?: string;
    supplierSelfRatingPlatform?: string;
    supplierSelfRatingSQM?: string;
    manufacturingMonitoringPlatform?: string;
    manufacturingMonitoringManager?: string;
    country?: string;
    qualityRating?: string;
    technicalQualityRating?: string;
    ecologyQualityRating?: string;
    supplierCategory?: string;
    businessLicence?: string;
    supplierRMSCode?: string;
    supplierName?: string;
    supplierExName?: string;
    supplierInn?: string;
    supplierExternalCode?: string;
    buId?: string;
    createdBy?: string;
    createdAt?: Date;
    supplierProjectTeam?: SupplierProjectTeam[];
    supplierContacts?: SupplierContact[];
    supplierDocuments?: SupplierDocument[];
    updatedBy?: string;
    updatedAt?: Date;
    productManagementNomenclatureDepartmentId?: number[];
    productManagementNomenclatureSubdepartmentId?: number[];
    productManagementNomenclatureTypeId?: number[];
    productManagementNomenclatureSubtypeId?: number[];
    productModelNomenclatureDepartmentId?: string[];
    productModelNomenclatureSubdepartmentId?: string[];
    productModelNomenclatureConsolidationId?: string[];
    productModelNomenclatureCodeId?: string[];
}
