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
} from '../../common/types/models';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const modelsApi = createApi({
    reducerPath: 'modelsApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getModels: builder.query<IModelsResponse, IModelsParams>({
            query: params => ({
                method: 'POST',
                url: 'search-quality-models',
                body: params.body,
                headers: {
                    securityCode: params.header.securityCode,
                },
            }),
        }),
        getModelNomenclature: builder.query<TModelNomenclatureResponse, IModelNomenclatureParams>({
            query: params => ({
                method: 'GET',
                url: 'product-model-nomenclature',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Application: params.application,
                    securityCode: params.securityCode,
                },
            }),
        }),
        getModelDetails: builder.query<IModelDetailsResponse, IModelDetailsParams>({
            query: params => ({
                method: 'GET',
                url: `quality-model-details/${params.id}`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: params.securityCode,
                },
            }),
        }),
        updateQualityModel: builder.mutation<IUpdateQualityModelResponse, IUpdateQualityModelParams>({
            query: queryArg => ({
                url: `update-quality-model/${queryArg.id}`,
                method: 'PATCH',
                body: queryArg.body,
                headers: {
                    Application: queryArg.application,
                    Accept: queryArg.accept,
                    securityCode: queryArg.securityCode,
                },
            }),
        }),
        updateMasterPlanTasks: builder.mutation<IUpdateMasterPlanTasksResponse, IUpdateMasterPlanTasksParams>({
            query: queryArg => ({
                url: `update-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
                headers: {securityCode: queryArg.securityCode},
            }),
        }),
        createMasterPlanTasks: builder.mutation<IUpdateMasterPlanTasksResponse, IUpdateMasterPlanTasksParams>({
            query: queryArg => ({
                url: `create-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
                headers: {securityCode: queryArg.securityCode},
            }),
        }),
        getTaskCategory: builder.query<TTaskCategoryResponse, ITaskCategoryParams>({
            query: params => ({
                method: 'GET',
                url: 'regulatory-quality-management/master-plan/task-category',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: params.securityCode,
                },
            }),
        }),
    }),
});

export default modelsApi;
