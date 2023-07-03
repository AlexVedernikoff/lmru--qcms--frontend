// https://qcms-dev-shared-stage.apps.lmru.tech/api/qas/swagger-ui/index.html#/Quality%20Actions%20API/createTasks

interface ICreateTaskRequestHeader {
    securityCode: string;
}

export interface ICreateTaskRequestBody {
    qualityActions: [
        {
            id?: number;
            actionStatus: string;
            targetBuCodes: number[];
            conclusion?: string;
            isForUpdate: boolean;
            categoryName: string;
            categoryTypeName: string;
            realisationDueDate: string;
            approvalDueDate: string;
            approvers?: Approver[];
            responsible?: [
                {
                    type: string;
                    externalId: string;
                }
            ];
            publicComments?: PublicComment[];
            supplierData?: ISupplierData;
            product?: IProduct;
            documents?: {
                awaitedDocuments?: IAwaitedDocument[];
            };
        }
    ];
    createdBy: string;
}

export interface ICreateTaskRequest {
    header: ICreateTaskRequestHeader;
    body: ICreateTaskRequestBody;
}

export interface ICreateTaskResponse {}

interface Approver {
    type: string;
    externalId: string;
}

interface PublicComment {
    id?: number;
    order?: number;
    comment: string;
    createdAt: string;
    createdBy: string;
}

interface ISupplierData {
    id: number;
    name: string;
    supplierRMSCode: string;
    supplierAdeoCode: string;
    supplierTaxIdentifier: string;
}

interface IProduct {
    id: number;
    name: string;
    code: string;
    ean: string;
    isFromProject: boolean;
    productRange?: string;
    qualityModel: string;
    regulatoryStatus: string;
    adeoRisk: string;
}

interface IAwaitedDocument {
    type: string;
    templateId?: number;
    linkedRegulations: number[];
    requirementType: string;
}
