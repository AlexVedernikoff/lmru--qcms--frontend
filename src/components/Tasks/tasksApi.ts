import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    ITaskListParams,
    ITaskListResponse,
    ITaskActionParams,
    ITaskActionResponse,
    ITaskUploadDocumentParams,
    ITaskUploadDocumentResponse,
} from '../../common/types/tasks';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getTasks: builder.query<ITaskListResponse, ITaskListParams>({
            query: params => ({
                method: 'POST',
                url: 'search-quality-actions',
                body: params.body,
                headers: {
                    securityCode: params.header.securityCode,
                },
            }),
        }),
        updateTasks: builder.mutation<ITaskActionResponse, ITaskActionParams>({
            query: queryArg => ({
                url: `quality-actions:batch-update`,
                method: 'POST',
                body: queryArg.body,
                headers: queryArg.header,
            }),
        }),
        createDocument: builder.mutation<ITaskUploadDocumentResponse, ITaskUploadDocumentParams>({
            query: queryArg => ({
                url: `create-quality-document`,
                method: 'POST',
                body: queryArg.body,
                headers: queryArg.header,
            }),
        }),
    }),
});

export default tasksApi;
