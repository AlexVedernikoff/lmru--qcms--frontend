import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IQualityDocumentsRequest, IQualityDocumentsResponse} from '../common/types/searchQualityDocuments';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

export const postSearchQualityDocuments = createApi({
    reducerPath: 'postSearchQualityDocuments',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        postQSearchQualityDocs: builder.query<IQualityDocumentsResponse, IQualityDocumentsRequest>({
            query: body => ({
                url: 'search-quality-documents',
                method: 'POST',
                body: {
                    pageIndex: 0,
                    pageSize: 20,
                    ...body,
                },
            }),
        }),
        postSearchQualityDocs: builder.mutation<any, IQualityDocumentsRequest>({
            query: body => ({
                url: 'search-quality-documents',
                method: 'POST',
                body: {
                    pageIndex: 0,
                    pageSize: 1,
                    ...body,
                },
            }),
        }),
    }),
});

export const {usePostQSearchQualityDocsQuery, usePostSearchQualityDocsMutation} = postSearchQualityDocuments;
