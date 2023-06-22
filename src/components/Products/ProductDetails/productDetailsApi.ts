import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IQualityProductDetailsParams} from '../../../common/types/productDetails';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const serviceUrl = {
    getDetailsForProducts: 'quality-product-details',
};

const productDetailsApi = createApi({
    reducerPath: 'productDetailsApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getDetailsForProducts: builder.query<any, IQualityProductDetailsParams>({
            query: params => ({
                method: 'GET',
                url: `${serviceUrl.getDetailsForProducts}/${params.id}`,
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
