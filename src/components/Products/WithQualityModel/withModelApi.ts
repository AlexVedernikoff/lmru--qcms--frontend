import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IWithModelNomenclatureParams,
    IWithModelParams,
    IWithModelResponse,
    TModelNomenclatureResponse,
} from '../../../common/types/withModel';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const serviceUrl = {
    getProducts: 'search-products',
    getModelNomenclature: 'product-model-nomenclature',
};

const withModelApi = createApi({
    reducerPath: 'withModelApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getModels: builder.query<IWithModelResponse, IWithModelParams>({
            query: params => ({
                method: 'POST',
                url: serviceUrl.getProducts,
                body: params.body,
                headers: {
                    securityCode: params.header.securityCode,
                },
            }),
        }),
        getModelNomenclature: builder.query<TModelNomenclatureResponse, IWithModelNomenclatureParams>({
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
    }),
});

export default withModelApi;
