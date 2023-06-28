import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IProductsNomenclatureRequest,
    IProductsRequest,
    IProductsResponse,
    TModelNomenclatureResponse,
} from '../../../common/types/products';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const serviceUrl = {
    getProducts: 'search-products',
    getProductsNomenclature: 'product-model-nomenclature',
};

const withModelApi = createApi({
    reducerPath: 'withModelApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getProducts: builder.query<IProductsResponse, IProductsRequest>({
            query: request => ({
                method: 'POST',
                url: serviceUrl.getProducts,
                body: request.body,
                headers: {
                    securityCode: request.header.securityCode,
                },
            }),
        }),
        getProductsNomenclature: builder.query<TModelNomenclatureResponse, IProductsNomenclatureRequest>({
            query: request => ({
                method: 'GET',
                url: serviceUrl.getProductsNomenclature,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Application: request.header.application,
                    securityCode: request.header.securityCode,
                },
            }),
        }),
    }),
});

export default withModelApi;
