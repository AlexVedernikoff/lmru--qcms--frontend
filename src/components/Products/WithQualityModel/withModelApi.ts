import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    IProductsNomenclatureRequest,
    IProductsRequest,
    IProductsResponse,
    TModelNomenclatureResponse,
} from '../../../common/types/products';
import {
    IProductsSendQualityMessageResponse,
    IProductsSendQualityMessageRequest,
} from '../../../common/types/productsSendQualityStatusMessage';
import {ICreateTaskResponse, ICreateTaskRequest} from '../../../common/types/createTask';
import {ITaskUploadDocumentResponse, ITaskUploadDocumentParams} from '../../../common/types/tasks';

const hostUrl = '';

const serviceUrl = {
    getProducts: 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/search-products',
    getProductsNomenclature: 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/product-model-nomenclature',
    productsSendQualityStatusMessage:
        'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/send-quality-status-message',
    createTask:
        'https://qcms-dev-shared-stage.apps.lmru.tech/api/qas/v1/quality-action-service/quality-actions:createTask',
};

const withModelApi = createApi({
    reducerPath: 'withModelApi',
    baseQuery: fetchBaseQuery({baseUrl: hostUrl}),
    endpoints: builder => ({
        getProducts: builder.query<IProductsResponse, IProductsRequest>({
            query: request => ({
                method: 'POST',
                url: serviceUrl.getProducts,
                body: request.body,
                headers: {
                    securityCode: request.header.securityCode,
                },
            }),
        }),
        getProductsNomenclature: builder.query<TModelNomenclatureResponse, IProductsNomenclatureRequest>({
            query: request => ({
                method: 'GET',
                url: serviceUrl.getProductsNomenclature,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Application: request.header.application,
                    securityCode: request.header.securityCode,
                },
            }),
        }),
        productsSendQualityStatusMessage: builder.mutation<
            IProductsSendQualityMessageResponse,
            IProductsSendQualityMessageRequest
        >({
            query: request => ({
                method: 'POST',
                url: serviceUrl.productsSendQualityStatusMessage,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    securityCode: request.header.securityCode,
                },
                body: request.body,
            }),
        }),
        createTask: builder.mutation<ICreateTaskResponse, ICreateTaskRequest>({
            query: request => ({
                method: 'POST',
                url: serviceUrl.createTask,
                body: request.body,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        createDocument: builder.mutation<ITaskUploadDocumentResponse, ITaskUploadDocumentParams>({
            query: queryArg => ({
                url: `create-quality-document`,
                method: 'POST',
                body: queryArg.body,
                headers: queryArg.header,
            }),
        }),
    }),
});

export default withModelApi;
