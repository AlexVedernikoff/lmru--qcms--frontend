import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IProductsNomenclatureRequest,
    IProductsRequest,
    IProductsResponse,
    TModelNomenclatureResponse,
} from '../../../common/types/products';
import {
    IProductsSendQualityMessageResponse,
    IProductsSendQualityMessageRequest,
} from '../../../common/types/productsSendQualityStatusMessage';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

const serviceUrl = {
    getProducts: 'v1/search-products',
    getProductsNomenclature: 'v1/product-model-nomenclature',
    productsSendQualityStatusMessage: 'send-quality-status-message',
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
        productsSendQualityStatusMessage: builder.mutation<
            IProductsSendQualityMessageResponse,
            IProductsSendQualityMessageRequest
        >({
            query: request => ({
                method: 'POST',
                url: serviceUrl.productsSendQualityStatusMessage,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: request.header.securityCode,
                },
                body: request.body,
            }),
        }),
    }),
});

export default withModelApi;
