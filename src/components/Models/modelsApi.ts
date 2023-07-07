import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IModelNomenclatureParams,
    IModelsParams,
    IModelsResponse,
    TModelNomenclatureResponse,
    IModelDetailsResponse,
    IModelDetailsParams,
    IUpdateMasterPlanTasksResponse,
    IUpdateMasterPlanTasksParams,
    IUpdateQualityModelResponse,
    IUpdateQualityModelParams,
    TTaskCategoryResponse,
    ITaskCategoryParams,
    IDeleteMasterPlanTasksResponse,
    IDeleteMasterPlanTasksParams,
} from '../../common/types/models';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

const commonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const modelsApi = createApi({
    reducerPath: 'modelsApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getModels: builder.query<IModelsResponse, IModelsParams>({
            query: params => ({
                method: 'POST',
                url: 'v1/search-quality-models',
                body: params.body,
                headers: {
                    ...commonHeaders,
                    securityCode: params.header.securityCode,
                },
            }),
        }),
        getModelNomenclature: builder.query<TModelNomenclatureResponse, IModelNomenclatureParams>({
            query: params => ({
                method: 'GET',
                url: 'v1/product-model-nomenclature',
                headers: {
                    ...commonHeaders,
                    Application: params.application,
                    securityCode: params.securityCode,
                },
            }),
        }),
        getModelDetails: builder.query<IModelDetailsResponse, IModelDetailsParams>({
            query: params => ({
                method: 'GET',
                url: `v1/quality-model-details/${params.id}`,
                headers: {
                    ...commonHeaders,
                    securityCode: params.securityCode,
                },
            }),
        }),
        updateQualityModel: builder.mutation<IUpdateQualityModelResponse, IUpdateQualityModelParams>({
            query: queryArg => ({
                url: `v1/update-quality-model/${queryArg.id}`,
                method: 'PATCH',
                body: queryArg.body,
                headers: {
                    ...commonHeaders,
                    Application: queryArg.application,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        updateMasterPlanTasks: builder.mutation<IUpdateMasterPlanTasksResponse, IUpdateMasterPlanTasksParams>({
            query: queryArg => ({
                url: `v1/update-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
                headers: {
                    ...commonHeaders,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        createMasterPlanTasks: builder.mutation<IUpdateMasterPlanTasksResponse, IUpdateMasterPlanTasksParams>({
            query: queryArg => ({
                url: `v1/create-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
                headers: {
                    ...commonHeaders,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        deleteMasterPlanTasks: builder.mutation<IDeleteMasterPlanTasksResponse, IDeleteMasterPlanTasksParams>({
            query: queryArg => ({
                url: `v1/delete-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
                headers: {securityCode: queryArg.securityCode},
            }),
        }),
        getTaskCategory: builder.query<TTaskCategoryResponse, ITaskCategoryParams>({
            query: params => ({
                method: 'GET',
                url: `regulatory-quality-management/master-plan/task-category`,
                headers: {
                    ...commonHeaders,
                    securityCode: params.securityCode,
                },
            }),
        }),
    }),
});

export const {useDeleteMasterPlanTasksMutation} = modelsApi;

export default modelsApi;
