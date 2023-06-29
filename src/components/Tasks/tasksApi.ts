import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ITaskListParams, ITaskListResponse, ITaskActionParams, ITaskActionResponse} from '../../common/types/tasks';

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
    }),
});

export default tasksApi;
