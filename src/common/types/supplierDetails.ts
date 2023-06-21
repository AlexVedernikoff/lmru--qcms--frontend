export interface ISupplierDetailsResponse {
    id: string;
    version: string;
    type: string;
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
    supplierCategory: string;
    businessLicence?: string;
    supplierRMSCode: string;
    supplierName?: string;
    supplierExName?: string;
    supplierInn?: string;
    supplierExternalCode?: string;
    buId: string[];
    supplierProjectTeam?: ISupplierProjectTeam[];
    supplierContacts?: SupplierContact[];
    supplierDocuments?: SupplierDocument[];
    creationInformation: CreationInformation;
    lastUpdateInfomation: LastUpdateInfomation;
}

export interface SupplierContact {
    id: string;
    surname: string;
    name: string;
    emailAddress: string;
    phoneNumber: string;
    mobilePhoneNumber: string;
    type: string;
}

export interface SupplierDocument {
    id: string;
    documentId: string;
}

export interface CreationInformation {
    createdAt: string;
    createdBy: string;
}

export interface LastUpdateInfomation {
    updatedAt: string;
    updatedBy: string;
}

export interface ISupplierProjectTeam {
    id: string;
    tabelNumber: string;
    surname: string;
    name: string;
    emailAddress: string;
    activityCode: string;
}
