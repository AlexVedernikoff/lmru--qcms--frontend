import {emptySplitApi as api} from './emptyApi';

/* #region types */
export type TPostV1CreateMasterPlanTasksByIdApiResponse = unknown;
export type TPostV1CreateMasterPlanTasksByIdApiArg = {
    application?: string;
    securityCode?: string;
    id: string;
    body: object;
};
export type TPostV1CreateQualityDocumentApiResponse = unknown;
export type TPostV1CreateQualityDocumentApiArg = {
    application?: string;
    securityCode?: string;
    body: {
        file1?: Blob;
        documentMetaData?: string;
    };
};
export type TPostV1DeleteMasterPlanTasksByIdApiResponse = /** status 200 OK */ undefined;
export type TPostV1DeleteMasterPlanTasksByIdApiArg = {
    securityCode?: string;
    application?: string;
    id: string;
    body: object;
};
export type TGetV1DownloadQualityDocumentByIdApiResponse = unknown;
export type TGetV1DownloadQualityDocumentByIdApiArg = {
    application?: string;
    securityCode?: string;
    id: string;
};
export type TPostV1SearchQualityModelsApiResponse = unknown;
export type TPostV1SearchQualityModelsApiArg = {
    application?: string;
    securityCode?: string;
    body: object;
};
export type TGetRegulatoryQualityManagementQualityModelsByIdApiResponse = /** status 200 OK */ object;
export type TGetRegulatoryQualityManagementQualityModelsByIdApiArg = {
    application?: string;
    securityCode?: string;
    id: string;
};
export type TGetV1SearchServiceNomeclatureApiResponse = unknown;
export type TGetV1SearchServiceNomeclatureApiArg = {
    accept?: string;
    'Content-Type'?: string;
    application?: string;
    securityCode?: string;
};
export type TGetV1PermissiveDocumentsApiResponse = /** status 200 OK */ undefined;
export type TGetV1PermissiveDocumentsApiArg = {
    securityCode?: string;
    application?: string;
    regulatory?: string;
};
export type TGetV1ProductModelNomenclatureApiResponse = unknown;
export type TGetV1ProductModelNomenclatureApiArg = {
    accept?: string;
    'Content-Type'?: string;
    application?: string;
    securityCode?: string;
};
export type TGetV1PartnerAssessmentInspectionAuditSuppliersByIdApiResponse = unknown;
export type TGetV1PartnerAssessmentInspectionAuditSuppliersByIdApiArg = {
    application?: string;
    id: string;
};
export type TGetProductQualityV1ProductsByProductIdApiResponse = unknown;
export type TGetProductQualityV1ProductsByProductIdApiArg = {
    qualityActionIds?: any[];
    documentIds?: any[];
    qualityModelId?: string;
    application?: string;
    accept: string;
    securityCode?: string;
    productId: string;
};
export type TPostV1SearchQualityActionsApiResponse = /** status 200 OK */ undefined;
export type TPostV1SearchQualityActionsApiArg = {
    securityCode?: string;
    application?: string;
    accept: string;
    body: object;
};
export type TPostV1SearchQualityDocumentsApiResponse = unknown;
export type TPostV1SearchQualityDocumentsApiArg = {
    accept?: string;
    'Content-Type'?: string;
    application?: string;
    securityCode?: string;
    body: object;
};
export type TGetV1SearchServiceProvidersApiResponse = unknown;
export type TGetV1SearchServiceProvidersApiArg = {
    application?: string;
    securityCode?: string;
    contacts?: boolean;
};
export type TPostV1PartnerAssessmentInspectionAuditSuppliersSearchApiResponse = unknown;
export type TPostV1PartnerAssessmentInspectionAuditSuppliersSearchApiArg = {
    accept?: string;
    'Content-Type'?: string;
    application?: string;
    body: object;
};
export type TPostV1SearchProductsApiResponse = unknown;
export type TPostV1SearchProductsApiArg = {
    securityCode?: string;
    application?: string;
    accept: string;
    body: object;
};
export type TPostSendQualityStatusMessageApiResponse = unknown;
export type TPostSendQualityStatusMessageApiArg = {
    securityCode?: string;
    application?: string;
    accept: string;
    body: object;
};
export type TPostProductQualityProductsSendQualityMessageApiResponse = unknown;
export type TPostProductQualityProductsSendQualityMessageApiArg = {
    accept?: string;
    'Content-Type'?: string;
    application?: string;
    securityCode?: string;
    body: object;
};
export type TPatchV1UpdateQualityModelByIdApiResponse = /** status 200 OK */ undefined;
export type TPatchV1UpdateQualityModelByIdApiArg = {
    application?: string;
    accept: string;
    securityCode?: string;
    id: string;
    body: object;
};
export type TPostV1UpdateMasterPlanTasksByIdApiResponse = /** status 200 OK */ undefined;
export type TPostV1UpdateMasterPlanTasksByIdApiArg = {
    securityCode?: string;
    id: string;
    body: object;
};
/* #endregion */

export const {
    usePostV1CreateMasterPlanTasksByIdMutation,
    usePostV1CreateQualityDocumentMutation,
    usePostV1DeleteMasterPlanTasksByIdMutation,
    useGetV1DownloadQualityDocumentByIdQuery,
    usePostV1SearchQualityModelsMutation,
    useGetRegulatoryQualityManagementQualityModelsByIdQuery,
    useGetV1SearchServiceNomeclatureQuery,
    useGetV1PermissiveDocumentsQuery,
    useGetV1ProductModelNomenclatureQuery,
    useGetV1PartnerAssessmentInspectionAuditSuppliersByIdQuery,
    useGetProductQualityV1ProductsByProductIdQuery,
    usePostV1SearchQualityActionsMutation,
    usePostV1SearchQualityDocumentsMutation,
    useGetV1SearchServiceProvidersQuery,
    usePostV1PartnerAssessmentInspectionAuditSuppliersSearchMutation,
    usePostV1SearchProductsMutation,
    usePostSendQualityStatusMessageMutation,
    usePostProductQualityProductsSendQualityMessageMutation,
    usePatchV1UpdateQualityModelByIdMutation,
    usePostV1UpdateMasterPlanTasksByIdMutation,
} = api.injectEndpoints({
    endpoints: build => ({
        postV1CreateMasterPlanTasksById: build.mutation<
            TPostV1CreateMasterPlanTasksByIdApiResponse,
            TPostV1CreateMasterPlanTasksByIdApiArg
        >({
            query: queryArg => ({
                url: `/v1/create-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
                headers: {Application: queryArg.application, securityCode: queryArg.securityCode},
            }),
        }),
        postV1CreateQualityDocument: build.mutation<
            TPostV1CreateQualityDocumentApiResponse,
            TPostV1CreateQualityDocumentApiArg
        >({
            query: queryArg => ({
                url: `/v1/create-quality-document`,
                method: 'POST',
                body: queryArg.body,
                headers: {Application: queryArg.application, securityCode: queryArg.securityCode},
            }),
        }),
        postV1DeleteMasterPlanTasksById: build.mutation<
            TPostV1DeleteMasterPlanTasksByIdApiResponse,
            TPostV1DeleteMasterPlanTasksByIdApiArg
        >({
            query: queryArg => ({
                url: `/v1/delete-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
                headers: {securityCode: queryArg.securityCode, Application: queryArg.application},
            }),
        }),
        getV1DownloadQualityDocumentById: build.query<
            TGetV1DownloadQualityDocumentByIdApiResponse,
            TGetV1DownloadQualityDocumentByIdApiArg
        >({
            query: queryArg => ({
                url: `/v1/download-quality-document/${queryArg.id}`,
                headers: {Application: queryArg.application, securityCode: queryArg.securityCode},
            }),
        }),
        postV1SearchQualityModels: build.mutation<
            TPostV1SearchQualityModelsApiResponse,
            TPostV1SearchQualityModelsApiArg
        >({
            query: queryArg => ({
                url: `/v1/search-quality-models`,
                method: 'POST',
                body: queryArg.body,
                headers: {Application: queryArg.application, securityCode: queryArg.securityCode},
            }),
        }),
        getRegulatoryQualityManagementQualityModelsById: build.query<
            TGetRegulatoryQualityManagementQualityModelsByIdApiResponse,
            TGetRegulatoryQualityManagementQualityModelsByIdApiArg
        >({
            query: queryArg => ({
                url: `/regulatory-quality-management/quality-models/${queryArg.id}`,
                headers: {Application: queryArg.application, securityCode: queryArg.securityCode},
            }),
        }),
        getV1SearchServiceNomeclature: build.query<
            TGetV1SearchServiceNomeclatureApiResponse,
            TGetV1SearchServiceNomeclatureApiArg
        >({
            query: queryArg => ({
                url: `/v1/search-service/nomeclature`,
                headers: {
                    Accept: queryArg.accept,
                    'Content-Type': queryArg['Content-Type'],
                    Application: queryArg.application,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        getV1PermissiveDocuments: build.query<TGetV1PermissiveDocumentsApiResponse, TGetV1PermissiveDocumentsApiArg>({
            query: queryArg => ({
                url: `/v1/permissive-documents`,
                headers: {securityCode: queryArg.securityCode, Application: queryArg.application},
                params: {regulatory: queryArg.regulatory},
            }),
        }),
        getV1ProductModelNomenclature: build.query<
            TGetV1ProductModelNomenclatureApiResponse,
            TGetV1ProductModelNomenclatureApiArg
        >({
            query: queryArg => ({
                url: `/v1/product-model-nomenclature`,
                headers: {
                    Accept: queryArg.accept,
                    'Content-Type': queryArg['Content-Type'],
                    Application: queryArg.application,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        getV1PartnerAssessmentInspectionAuditSuppliersById: build.query<
            TGetV1PartnerAssessmentInspectionAuditSuppliersByIdApiResponse,
            TGetV1PartnerAssessmentInspectionAuditSuppliersByIdApiArg
        >({
            query: queryArg => ({
                url: `/v1/partner-assessment-inspection-audit/suppliers/${queryArg.id}`,
                headers: {Application: queryArg.application},
            }),
        }),
        getProductQualityV1ProductsByProductId: build.query<
            TGetProductQualityV1ProductsByProductIdApiResponse,
            TGetProductQualityV1ProductsByProductIdApiArg
        >({
            query: queryArg => ({
                url: `/product-quality/v1/products/${queryArg.productId}`,
                headers: {
                    Application: queryArg.application,
                    Accept: queryArg.accept,
                    securityCode: queryArg.securityCode,
                },
                params: {
                    qualityActionIds: queryArg.qualityActionIds,
                    documentIds: queryArg.documentIds,
                    qualityModelId: queryArg.qualityModelId,
                },
            }),
        }),
        postV1SearchQualityActions: build.mutation<
            TPostV1SearchQualityActionsApiResponse,
            TPostV1SearchQualityActionsApiArg
        >({
            query: queryArg => ({
                url: `/v1/search-quality-actions`,
                method: 'POST',
                body: queryArg.body,
                headers: {
                    securityCode: queryArg.securityCode,
                    Application: queryArg.application,
                    Accept: queryArg.accept,
                },
            }),
        }),
        postV1SearchQualityDocuments: build.mutation<
            TPostV1SearchQualityDocumentsApiResponse,
            TPostV1SearchQualityDocumentsApiArg
        >({
            query: queryArg => ({
                url: `/v1/search-quality-documents`,
                method: 'POST',
                body: queryArg.body,
                headers: {
                    Accept: queryArg.accept,
                    'Content-Type': queryArg['Content-Type'],
                    Application: queryArg.application,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        getV1SearchServiceProviders: build.query<
            TGetV1SearchServiceProvidersApiResponse,
            TGetV1SearchServiceProvidersApiArg
        >({
            query: queryArg => ({
                url: `/v1/search-service-providers`,
                headers: {Application: queryArg.application, securityCode: queryArg.securityCode},
                params: {contacts: queryArg.contacts},
            }),
        }),
        postV1PartnerAssessmentInspectionAuditSuppliersSearch: build.mutation<
            TPostV1PartnerAssessmentInspectionAuditSuppliersSearchApiResponse,
            TPostV1PartnerAssessmentInspectionAuditSuppliersSearchApiArg
        >({
            query: queryArg => ({
                url: `/v1/partner-assessment-inspection-audit/suppliers:search`,
                method: 'POST',
                body: queryArg.body,
                headers: {
                    Accept: queryArg.accept,
                    'Content-Type': queryArg['Content-Type'],
                    Application: queryArg.application,
                },
            }),
        }),
        postV1SearchProducts: build.mutation<TPostV1SearchProductsApiResponse, TPostV1SearchProductsApiArg>({
            query: queryArg => ({
                url: `/v1/search-products`,
                method: 'POST',
                body: queryArg.body,
                headers: {
                    securityCode: queryArg.securityCode,
                    Application: queryArg.application,
                    Accept: queryArg.accept,
                },
            }),
        }),
        postSendQualityStatusMessage: build.mutation<
            TPostSendQualityStatusMessageApiResponse,
            TPostSendQualityStatusMessageApiArg
        >({
            query: queryArg => ({
                url: `/send-quality-status-message`,
                method: 'POST',
                body: queryArg.body,
                headers: {
                    securityCode: queryArg.securityCode,
                    Application: queryArg.application,
                    Accept: queryArg.accept,
                },
            }),
        }),
        postProductQualityProductsSendQualityMessage: build.mutation<
            TPostProductQualityProductsSendQualityMessageApiResponse,
            TPostProductQualityProductsSendQualityMessageApiArg
        >({
            query: queryArg => ({
                url: `/product-quality/products:send-quality-message`,
                method: 'POST',
                body: queryArg.body,
                headers: {
                    Accept: queryArg.accept,
                    'Content-Type': queryArg['Content-Type'],
                    Application: queryArg.application,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        patchV1UpdateQualityModelById: build.mutation<
            TPatchV1UpdateQualityModelByIdApiResponse,
            TPatchV1UpdateQualityModelByIdApiArg
        >({
            query: queryArg => ({
                url: `/v1/update-quality-model/${queryArg.id}`,
                method: 'PATCH',
                body: queryArg.body,
                headers: {
                    Application: queryArg.application,
                    Accept: queryArg.accept,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        postV1UpdateMasterPlanTasksById: build.mutation<
            TPostV1UpdateMasterPlanTasksByIdApiResponse,
            TPostV1UpdateMasterPlanTasksByIdApiArg
        >({
            query: queryArg => ({
                url: `/v1/update-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
                headers: {securityCode: queryArg.securityCode},
            }),
        }),
    }),
    overrideExisting: false,
});
