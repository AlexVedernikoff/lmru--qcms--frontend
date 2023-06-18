import {IPageable} from './common';

interface ITaskListBody {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: 'ASC' | 'DESC';
    searchBy?: {
        productCode?: string;
        productName?: string;
        ean?: string;
        supplierRMSCode?: string;
        supplierName?: string;
        supplierTaxIdentifier?: string;
        actionStatuses?: string[];
        awaitedDocumentTypes?: string[];
        responsible?: {
            type?: 'SUPPLIER' | 'SERVICE_PROVIDER' | 'QE' | 'SQM';
            externalId?: string;
        }[];
        qualityActionId?: number;
        categotyName?: string;
        categoryTypeNames?: string[];
        conclusions?: string[];
        isForUpdate?: boolean;
        productRange?: string;
        dates?: {
            dateType: 'APPROVAL_DATE' | 'REALISATIONDUE_DATE' | 'UPDATED' | 'CREATED';
            startDate: string;
            endDate: string;
        };
        productQualityModel?: string;
    };
}

export interface ITaskListParams {
    header: {
        securityCode: string;
    };
    body: ITaskListBody;
}

export interface ITaskListItem {
    id: number;
    actionStatus: string;
    version: number;
    targetBuCodes: number[];
    conclusion: string;
    isForUpdate: string;
    categoryName: string;
    categoryTypeName: string;
    realisationDueDate: string;
    approvalDueDate: string;
    approvers: {
        type: string;
        externalId: string;
    }[];
    responsible: {
        type: string;
        externalId: string;
    }[];
    supplierData: {
        id: number;
        name: string;
        supplierRMSCode: string;
        supplierAdeoCode: string;
        supplierTaxIdentifier: string;
    };
    product: {
        id: number;
        name: string;
        code: string;
        ean: string;
        fromProject: boolean;
        productRange: string;
        qualityModel: string;
        regulatoryStatus: string;
        adeoRisk: string;
    };
    publicComments: {
        id: number;
        order: number;
        comment: string;
        createdAt: string;
        createdBy: string;
    }[];
    documents: {
        awaitedDocuments: {
            type: string;
            templateId: number;
            linkedRegulations: number[];
            requirementType: string;
        }[];
        uploadedDocuments: {
            id: number;
            linkedTaskIds: string[];
        }[];
    };
    creationInformation: {
        createdAt: string;
        createdBy: string;
    };
    lastUpdateInfomation: {
        updatedAt: string;
        updatedBy: string;
    };
}

export interface ITaskListResponse {
    pageable: IPageable;
    content: ITaskListItem[];
}
