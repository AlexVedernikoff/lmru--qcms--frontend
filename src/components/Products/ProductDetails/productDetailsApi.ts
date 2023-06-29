import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IQualityProductDetailsParams, ProductDetails} from '../../../common/types/productDetails';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

const serviceUrl = {
    getDetailsForProducts: 'product-quality/v1/products',
    updateProduct: 'product-quality/products:send-quality-message',
};

export const productDetailsApi = createApi({
    reducerPath: 'productDetailsApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    tagTypes: ['Details'],

    endpoints: builder => ({
        getDetailsForProducts: builder.query<ProductDetails, IQualityProductDetailsParams>({
            query: params => ({
                method: 'GET',
                url: `${serviceUrl.getDetailsForProducts}/${params.productId}`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: params.securityCode,
                },
            }),
            providesTags: ['Details'],
        }),
        postUpdateProduct: builder.mutation<ProductDetails, IQualityProductDetailsParams>({
            query: params => ({
                method: 'POST',
                url: serviceUrl.updateProduct,
                body: params.body,
                headers: {
                    securityCode: params.securityCode,
                },
            }),
            invalidatesTags: ['Details'],
        }),
    }),
});

export const {useLazyGetDetailsForProductsQuery, useGetDetailsForProductsQuery, usePostUpdateProductMutation} =
    productDetailsApi;