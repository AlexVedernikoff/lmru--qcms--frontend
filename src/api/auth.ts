import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AuthRequest, UserData} from 'common/types/auth';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
    }),
    endpoints: builder => ({
        auth: builder.mutation<UserData, AuthRequest>({
            query: request => ({
                url: 'authorization',
                method: 'POST',
                headers: {
                    securityCode: request.header.securityCode,
                    accesstoken: request.header.accesstoken,
                    refreshtoken: request.header.refreshtoken,
                    authorizationcode: request.header.authorizationcode,
                },
            }),
            // Данный метод вызывается только, если запрос успешно отработал.
            transformResponse(response: any, meta, request) {
                return {
                    userName: meta?.response?.headers.get('username') || '',
                    accessToken: meta?.response?.headers.get('response') || '',
                    refreshToken: meta?.response?.headers.get('refreshtoken') || '',
                    roles: meta?.response?.headers.get('roles') || '',
                    supplierCommercialIds: meta?.response?.headers.get('suppliercommercialids') || '',
                };
            },
        }),
    }),
});
