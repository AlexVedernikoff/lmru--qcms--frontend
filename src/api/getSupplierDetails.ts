import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ISupplierDetailsResponse} from '../common/types/supplierDetails';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

export const getSupplierDetails = createApi({
    reducerPath: 'getSupplierDetails',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        getSupplierDets: builder.query<ISupplierDetailsResponse, number>({
            query: id => `/partner-assessment-inspection-audit/suppliers/${id}`,
        }),
    }),
});

export const {useGetSupplierDetsQuery} = getSupplierDetails;
