import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ISearchProductsRequest, ISearchProductsResponse} from '../common/types/searchProducts';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

export const postSearchProducts = createApi({
    reducerPath: 'postSearchProducts',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        postQSearchProducts: builder.query<ISearchProductsResponse, ISearchProductsRequest>({
            query: body => ({
                url: 'search-quality-actions',
                method: 'POST',
                body: {
                    pageIndex: 0,
                    pageSize: 20,
                    ...body,
                },
            }),
        }),
        postSearchProds: builder.mutation<ISearchProductsResponse, ISearchProductsRequest>({
            query: body => ({
                url: 'search-products',
                method: 'POST',
                body: {
                    pageIndex: 0,
                    pageSize: 10,
                    ...body,
                },
            }),
        }),
    }),
});

export const {usePostQSearchProductsQuery, usePostSearchProdsMutation} = postSearchProducts;
