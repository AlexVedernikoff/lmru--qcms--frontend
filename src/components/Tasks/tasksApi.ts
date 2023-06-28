import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ITaskListParams, ITaskListResponse} from '../../common/types/tasks';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const serviceUrl = {
    getTasks: 'search-quality-actions',
};

const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getTasks: builder.query<ITaskListResponse, ITaskListParams>({
            query: params => ({
                method: 'POST',
                url: serviceUrl.getTasks,
                body: params.body,
                headers: {
                    securityCode: params.header.securityCode,
                },
            }),
        }),
    }),
});

export default tasksApi;
