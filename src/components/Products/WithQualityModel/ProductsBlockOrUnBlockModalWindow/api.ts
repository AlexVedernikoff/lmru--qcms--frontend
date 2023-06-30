import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUpdateProductsRequest, IUpdateProductsResponse} from '../../../../common/types/updateProducts';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

const serviceUrl = {
    updateProducts: 'product-quality/products:send-quality-message',
};

const api = createApi({
    reducerPath: 'withoutModelApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
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
        }),
    }),
});

export default api;
