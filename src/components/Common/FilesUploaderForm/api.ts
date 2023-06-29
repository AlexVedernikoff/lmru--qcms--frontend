import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ICreateDocumentResponse, ICreateDocumentRequest} from '../../../common/types/createDocument';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

const serviceUrl = {
    createDocument: 'create-quality-document', // https://confluence.lmru.tech/display/QCMS/POST+create-documents
};

const api = createApi({
    reducerPath: 'withoutModelApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        createDocument: builder.mutation<ICreateDocumentResponse, ICreateDocumentRequest>({
            query: request => ({
                method: 'POST',
                url: serviceUrl.createDocument,
                headers: {
                    securityCode: request.header.securityCode,
                },
                body: request.body,
            }),
        }),
    }),
});

export default api;
