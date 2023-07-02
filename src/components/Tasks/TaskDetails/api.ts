import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ITaskDetails, ITaskUpdateInfoParams, ITaskUpdateInfoResponse} from '../../../common/types/taskDetails';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const serviceUrl = {
    getTaskDetails: 'quality-actions-details',
    updateTaskDetails: 'quality-actions:batch-update',
    uploadQualityDocument: 'create-quality-document',
};

export const taskDetailsApi = createApi({
    reducerPath: 'taskDetailsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    tagTypes: ['TaskData'],
    endpoints: builder => ({
        getTaskDetails: builder.query<ITaskDetails, string>({
            query: id => `${serviceUrl.getTaskDetails}/${id}`,
            providesTags: ['TaskData'],
        }),
        updateTaskDetails: builder.mutation<ITaskUpdateInfoResponse, ITaskUpdateInfoParams>({
            query: params => ({
                url: serviceUrl.updateTaskDetails,
                method: 'POST',
                body: params,
                invalidatesTags: ['TaskData'],
            }),
        }),
        postTaskDocuments: builder.query({
            query: params => ({
                url: serviceUrl.uploadQualityDocument,
                method: 'POST',
                body: params,
            }),
        }),
    }),
});
