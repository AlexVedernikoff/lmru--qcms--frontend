import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {ITaskDetails, ITaskUpdateInfoParams, ITaskUpdateInfoResponse} from '../../../common/types/taskDetails';
const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';
const serviceTaskDetails = 'quality-actions-details';
const updateInfoTask = 'quality-actions:batch-update';
const servicePostTaskDocuments = 'create-quality-document';

export const taskDetailsApi = createApi({
    reducerPath: 'taskDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        updateInfoTask: builder.mutation<ITaskUpdateInfoResponse, ITaskUpdateInfoParams>({
            query: params => ({
                url: updateInfoTask,
                method: 'POST',
                body: params,
            }),
        }),
        getTaskDetails: builder.query<ITaskDetails, string>({
            query: id => `${serviceTaskDetails}/${id}`,
        }),
        postTaskDocuments: builder.query({
            query: params => ({
                url: servicePostTaskDocuments,
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const {useGetTaskDetailsQuery, useUpdateInfoTaskMutation, usePostTaskDocumentsQuery} = taskDetailsApi;
