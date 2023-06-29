import {IPageable} from './common';

interface IResponsible {
    type?: 'SUPPLIER' | 'SERVICE_PROVIDER' | 'QE' | 'SQM';
    externalId?: string;
}

interface IDates {
    dateType?: 'APPROVAL_DATE' | 'REALISATIONDUE_DATE' | 'UPDATED' | 'CREATED';
    startDate?: string;
    endDate?: string;
}

interface ISearchBy {
    productCode?: string;
    productName?: string;
    ean?: string;
    supplierRMSCode?: string;
    supplierName?: string;
    supplierTaxIdentifier?: string;
    actionStatuses?: string[];
    awaitedDocumentTypes?: string[];
    responsible?: IResponsible[];
    qualityActionId?: number;
    categotyName?: string;
    categoryTypeNames?: string[];
    conclusions?: string[];
    isForUpdate?: boolean;
    productRange?: string;
    dates?: IDates;
    productQualityModel?: string;
}

interface ITaskListBody {
    pageIndex: number;
    pageSize: number;
    sortField: string;
    sortDirection: 'ASC' | 'DESC';
    searchBy: ISearchBy;
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

interface ITaskActionApprover {
    type: string;
    externalId: string;
}

interface ITaskActionResponsible {
    type: string;
    externalId: string;
}

interface ITaskActionQualityAction {
    id: number;
    actionStatus: string;
    conclusion: string;
    approvers: ITaskActionApprover[];
    responsible: ITaskActionResponsible[];
    publicComment: string;
}

export interface ITaskActionParams {
    header: {
        securityCode: string;
    };
    body: {
        qualityActions: ITaskActionQualityAction[];
        updatedBy: string;
    };
}
export interface ITaskActionResponse {}
