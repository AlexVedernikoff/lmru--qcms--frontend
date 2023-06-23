import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IQualityProductDetailsParams} from '../../../common/types/productDetails';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

const serviceUrl = {
    getDetailsForProducts: 'product-quality/v1/products',
};

const productDetailsApi = createApi({
    reducerPath: 'productDetailsApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getDetailsForProducts: builder.query<any, IQualityProductDetailsParams>({
            query: params => ({
                method: 'GET',
                url: `${serviceUrl.getDetailsForProducts}/${params.id}?1`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: params.securityCode,
                },
            }),
        }),
    }),
});

export default productDetailsApi;
