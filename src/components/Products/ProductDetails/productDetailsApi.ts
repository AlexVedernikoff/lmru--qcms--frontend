import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IQualityProductDetailsParams} from '../../../common/types/productDetails';

import {prepareUrlQueryPart} from '../../../utils/prepareUrlQueryPart';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

const serviceUrl = {
    getDetailsForProducts: 'product-quality/v1/products',
};

export const productDetailsApi = createApi({
    reducerPath: 'productDetailsApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getDetailsForProducts: builder.query<any, IQualityProductDetailsParams>({
            query: params => ({
                method: 'GET',
                url: `${serviceUrl.getDetailsForProducts}/${params.productId}${prepareUrlQueryPart(
                    params.mockIdsForQuery
                )}`,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: params.securityCode,
                },
            }),
        }),
    }),
});

export const {useGetDetailsForProductsQuery} = productDetailsApi;
