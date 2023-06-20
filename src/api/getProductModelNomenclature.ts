import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IProductModelNomenclatureResponse} from '../common/types/productModelNomenclature';

const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/';

export const getProductModelNomenclature = createApi({
    reducerPath: 'getProductModelNomenclature',
    baseQuery: fetchBaseQuery({
        baseUrl: hostUrl,
        prepareHeaders: (headers, {getState}) => {
            headers.set('securityCode', 'security_code');
            return headers;
        },
    }),
    endpoints: builder => ({
        getProductModelNomenclature: builder.query<IProductModelNomenclatureResponse[], void>({
            query: () => 'product-model-nomenclature',
        }),
    }),
});

export const {useGetProductModelNomenclatureQuery} = getProductModelNomenclature;
