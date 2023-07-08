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

const modelsApi = createApi({
    reducerPath: 'modelsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            headers.set('Accept', 'application/json');
            headers.set('Content-Type', 'application/json');

            return headers;
        },
    }),
    endpoints: builder => ({
        getModels: builder.query<IModelsResponse, IModelsParams>({
            query: params => ({
                method: 'POST',
                url: 'v1/search-quality-models',
                body: params.body,
            }),
        }),
        getModelNomenclature: builder.query<TModelNomenclatureResponse, IModelNomenclatureParams>({
            query: params => ({
                method: 'GET',
                url: 'v1/product-model-nomenclature',
            }),
        }),
        getModelDetails: builder.query<IModelDetailsResponse, IModelDetailsParams>({
            query: params => ({
                method: 'GET',
                url: `v1/quality-model-details/${params.id}`,
            }),
        }),
        updateQualityModel: builder.mutation<IUpdateQualityModelResponse, IUpdateQualityModelParams>({
            query: queryArg => ({
                url: `v1/update-quality-model/${queryArg.id}`,
                method: 'PATCH',
                body: queryArg.body,
            }),
        }),
        updateMasterPlanTasks: builder.mutation<IUpdateMasterPlanTasksResponse, IUpdateMasterPlanTasksParams>({
            query: queryArg => ({
                url: `v1/update-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
            }),
        }),
        createMasterPlanTasks: builder.mutation<IUpdateMasterPlanTasksResponse, IUpdateMasterPlanTasksParams>({
            query: queryArg => ({
                url: `v1/create-master-plan-tasks/${queryArg.id}`,
                method: 'POST',
                body: queryArg.body,
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
            }),
        }),
    }),
});

export const {useDeleteMasterPlanTasksMutation} = modelsApi;

export default modelsApi;
