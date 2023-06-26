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
        postSearchProds: builder.mutation<ISearchProductsResponse, ISearchProductsRequest>({
            query: body => ({
                url: 'search-products',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {usePostSearchProdsMutation} = postSearchProducts;
