import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IModelNomenclatureParams,
    IModelsParams,
    IModelsResponse,
    TModelNomenclatureResponse,
    IModelDetailsResponse,
    IModelDetailsParams,
} from '../../common/types/models';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const serviceUrl = {
    getModels: 'search-quality-models',
    getModelNomenclature: 'product-model-nomenclature',
    getModelDetails: 'quality-model-details',
};

const modelsApi = createApi({
    reducerPath: 'modelsApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getModels: builder.query<IModelsResponse, IModelsParams>({
            query: params => ({
                method: 'POST',
                url: serviceUrl.getModels,
                body: params.body,
                headers: {
                    securityCode: params.header.securityCode,
                },
            }),
        }),
        getModelNomenclature: builder.query<TModelNomenclatureResponse, IModelNomenclatureParams>({
            query: params => ({
                method: 'GET',
                url: serviceUrl.getModelNomenclature,
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
                url: `${serviceUrl.getModelDetails}/${params.id}`,
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
