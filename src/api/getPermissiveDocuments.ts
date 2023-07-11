import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IPermissiveDocumentsResponse} from '../common/types/permissiveDocuments';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

export const getPermissiveDocuments = createApi({
    reducerPath: 'getPermissiveDocuments',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        getPermissiveDocs: builder.query<IPermissiveDocumentsResponse[], boolean | void>({
            query: flag => (flag ? `permissive-documents?regulatory=${flag}` : `permissive-documents`),
        }),
    }),
});

export const {useGetPermissiveDocsQuery} = getPermissiveDocuments;
