import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IQualityActionsRequest, IQualityActionsResponse} from '../common/types/searchQualityActions';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

export const postSearchQualityActions = createApi({
    reducerPath: 'postSearchQualityActions',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        postSearchQualityActions: builder.query<IQualityActionsResponse, IQualityActionsRequest>({
            query: body => ({
                url: 'search-quality-actions',
                method: 'POST',
                body: {
                    pageIndex: 0,
                    pageSize: 20,
                    ...body,
                },
            }),
        }),
    }),
});

export const {usePostSearchQualityActionsQuery} = postSearchQualityActions;
