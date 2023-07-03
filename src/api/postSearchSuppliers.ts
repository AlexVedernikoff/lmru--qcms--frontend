import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ISearchSuppliersRequest, ISearchSuppliersResponse} from '../common/types/searchSuppliers';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

export const postSearchSuppliers = createApi({
    reducerPath: 'postSearchSuppliers',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        postSearchSuppls: builder.mutation<ISearchSuppliersResponse, ISearchSuppliersRequest>({
            query: body => ({
                url: 'partner-assessment-inspection-audit/suppliers:search',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {usePostSearchSupplsMutation} = postSearchSuppliers;
