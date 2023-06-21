import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {ITaskDetails, ITaskUpdateInfoParams, ITaskUpdateInfoResponse} from '../../../common/types/taskDetails';

//TODO с бэка адрес рабочий пока используется чтобы получить хотя бы какие-то данные потом изменить на hostUrl и расскоментить serviceTaskDetails
const test = 'https://qcms-dev-shared-stage.apps.lmru.tech/api/qas/';
// const hostUrl = 'https://qcms-dev-shared-stage.apps.lmru.tech/api/rqrms/';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';
const serviceTaskDetails = '/v1/quality-action-service/quality-actions';
// const serviceTaskDetails = '/v1/quality-actions-details'
const updateInfoTask = '/quality-actions:batch-update';
const servicePostTaskDocuments = '/v1/create-quality-document';

export const taskDetailsApi = createApi({
    reducerPath: 'taskDetailsApi',
    baseQuery: fetchBaseQuery({baseUrl: test}),
    endpoints: builder => ({
        updateInfoTask: builder.mutation<ITaskUpdateInfoResponse, ITaskUpdateInfoParams>({
            query: params => ({
                url: updateInfoTask,
                method: 'POST',
                body: params,
            }),
        }),
        getTaskDetails: builder.query<ITaskDetails, number>({
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
