import {IPageable} from './common';

export interface IQualityActionsRequest {
    pageIndex?: number;
    pageSize?: number;
    sortField?: string;
    sortDirection?: string;
    searchBy: Partial<SearchBy>;
}

export interface SearchBy {
    productCode: string;
    productName: string;
    ean: string;
    supplierRMSCode: string;
    supplierName: string;
    supplierTaxIdentifier: string;
    actionStatuses: string[];
    awaitedDocumentTypes: string[];
    responsible: ResponsibleClass[];
    qualityActionId: number;
    categotyName: string;
    categoryTypeNames: string[];
    conclusions: string[];
    isForUpdate: boolean;
    isOverdue: boolean;
    productRange: string;
    dates: DatesClass;
    productQualityModel: string;
}

interface ResponsibleClass {
    type?: string;
    externalId: string;
}

interface DatesClass {
    dateType: string;
    startDate: string;
    endDate: string;
}

export interface IQualityActionsResponse {
    pageable: IPageable;
    content: any[];
}
