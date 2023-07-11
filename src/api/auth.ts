import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EUserRole} from 'common/roles';
import {AuthRequest, UserData} from 'common/types/auth';
import {decodeUriSafely} from 'utils/decodeUriSafely';

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
                const userNameURI = meta?.response?.headers.get('username') || '';
                const roles = meta?.response?.headers.get('roles');
                const rolesArray = roles ? roles.split(',') : [];

                return {
                    userName: decodeUriSafely(userNameURI),
                    accessToken: meta?.response?.headers.get('accesstoken') || '',
                    refreshToken: meta?.response?.headers.get('refreshtoken') || '',
                    roles: rolesArray as EUserRole[],
                    supplierCommercialIds: meta?.response?.headers.get('suppliercommercialids') || '',
                };
            },
        }),
    }),
});
