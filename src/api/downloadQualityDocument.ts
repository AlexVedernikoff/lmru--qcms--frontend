import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import {IProductModelNomenclatureResponse} from '../common/types/productModelNomenclature';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/';

export const downloadQualityDocument = createApi({
    reducerPath: 'downloadQualityDocument',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        downloadQualityDocument: builder.query<any, void>({
            query: id => `/v1/download-quality-document/${110}`,
        }),
    }),
});

export const {useDownloadQualityDocumentQuery} = downloadQualityDocument;
