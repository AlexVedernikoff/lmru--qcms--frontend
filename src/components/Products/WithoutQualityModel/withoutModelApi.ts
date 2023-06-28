import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IQualityModelsRequest, IQualityModelsResponse} from '../../../common/types/searchQualityModels';
import {IUpdateProductsRequest, IUpdateProductsResponse} from '../../../common/types/updateProducts';
import {
    IProductsNomenclatureRequest,
    IProductsRequest,
    IProductsResponse,
    TModelNomenclatureResponse,
} from '../../../common/types/products';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

const serviceUrl = {
    getProducts: 'v1/search-products', // https://confluence.lmru.tech/display/QCMS/POST+search-products
    getQualityModels: 'v1/search-quality-models', // https://confluence.lmru.tech/pages/viewpage.action?pageId=234492302
    getModelNomenclature: 'v1/product-model-nomenclature', // https://confluence.lmru.tech/display/QCMS/GET+product-model-nomenclature
    updateProducts: 'product-quality/products:send-quality-message', // https://confluence.lmru.tech/pages/viewpage.action?pageId=234509914
};

const withoutModelApi = createApi({
    reducerPath: 'withoutModelApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    tagTypes: ['Products'],
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
            providesTags: ['Products'],
        }),
        getQualityModels: builder.query<IQualityModelsResponse, IQualityModelsRequest>({
            query: request => ({
                method: 'POST',
                url: serviceUrl.getQualityModels,
                body: request.body,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: request.header.securityCode,
                },
            }),
        }),
        getModelNomenclature: builder.query<TModelNomenclatureResponse, IProductsNomenclatureRequest>({
            query: request => ({
                method: 'GET',
                url: serviceUrl.getModelNomenclature,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Application: request.header.application,
                    securityCode: request.header.securityCode,
                },
            }),
        }),
        updateProducts: builder.mutation<IUpdateProductsResponse, IUpdateProductsRequest>({
            query: request => ({
                method: 'POST',
                url: serviceUrl.updateProducts,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: request.header.securityCode,
                },
                body: request.body,
            }),
            invalidatesTags: ['Products'],
        }),
    }),
});

export default withoutModelApi;
