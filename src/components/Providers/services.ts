import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IManagementNomenclature,
    IModelNomenclature,
    IProvidersParams,
    IProvidersResponse,
} from '../../common/types/providers';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech';
const serviceUrl = '/v1/partner-assessment-inspection-audit/suppliers:search';
const serviceModelNomenclature = '/v1/product-model-nomenclature';
const serviceManagementNomenclature = '/v1/search-service/nomenclature';

export const providersApi = createApi({
    reducerPath: 'providersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        getProviders: builder.query<IProvidersResponse, IProvidersParams>({
            query: params => ({
                url: serviceUrl,
                method: 'POST',
                body: params,
            }),
        }),
        getProductModelNomenclature: builder.query<IModelNomenclature, void>({
            query: () => serviceModelNomenclature,
        }),
        getManagementNomenclature: builder.query<IManagementNomenclature, void>({
            query: () => serviceManagementNomenclature,
        }),
    }),
});

export const {useGetProvidersQuery, useGetProductModelNomenclatureQuery, useGetManagementNomenclatureQuery} =
    providersApi;
