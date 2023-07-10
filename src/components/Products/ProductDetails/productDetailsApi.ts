import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IQsearchModelsParams,
    IQsearchModelsRes,
    IQualityProductDetailsParams,
    ProductDetails,
} from '../../../common/types/productDetails';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

const serviceUrl = {
    getDetailsForProducts: 'product-quality/v1/products',
    updateProduct: 'product-quality/products:send-quality-message',
    searchQmodels: 'v1/search-quality-models',
};

export const productDetailsApi = createApi({
    reducerPath: 'productDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Update'],
    endpoints: builder => ({
        getDetailsForProducts: builder.query<ProductDetails, IQualityProductDetailsParams>({
            query: params => ({
                method: 'GET',
                url: `${serviceUrl.getDetailsForProducts}/${params.productId}`,
            }),
            providesTags: ['Update'],
        }),
        postUpdateProduct: builder.mutation<ProductDetails[], IQualityProductDetailsParams>({
            query: params => ({
                method: 'POST',
                url: serviceUrl.updateProduct,
                body: params.body,
            }),
            invalidatesTags: ['Update'],
        }),
        postSearchQModels: builder.mutation<IQsearchModelsRes, IQsearchModelsParams>({
            query: params => ({
                method: 'POST',
                url: serviceUrl.searchQmodels,
                body: params.body,
            }),
        }),
    }),
});

export const {useGetDetailsForProductsQuery, usePostUpdateProductMutation, usePostSearchQModelsMutation} =
    productDetailsApi;
