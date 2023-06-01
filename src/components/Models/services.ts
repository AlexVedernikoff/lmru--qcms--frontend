import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IModelsParams, IModelsResponse} from '../../common/types/models';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';
const serviceUrl = 'search-quality-models';

export const modelsApi = createApi({
    reducerPath: 'modelsApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getModels: builder.query<IModelsResponse, IModelsParams>({
            query: params => serviceUrl,
        }),
    }),
});

export const {useGetModelsQuery} = modelsApi;
