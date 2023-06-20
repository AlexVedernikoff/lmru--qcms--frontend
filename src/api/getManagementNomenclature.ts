import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {IProductModelNomenclatureResponse} from '../common/types/productModelNomenclature';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

export const getManagementNomenclature = createApi({
    reducerPath: 'getManagementNomenclature',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        getManagementNomenclature: builder.query<any, void>({
            query: () => 'search-service/nomeclature',
        }),
    }),
});

export const {useGetManagementNomenclatureQuery} = getManagementNomenclature;
