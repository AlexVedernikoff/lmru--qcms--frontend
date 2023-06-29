import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import modelsApi from '../components/Models/modelsApi';
import tasksApi from '../components/Tasks/tasksApi';
import withModelApi from '../components/Products/WithQualityModel/withModelApi';
import withoutModelApi from '../components/Products/WithoutQualityModel/withoutModelApi';
import {getManagementNomenclature} from '../api/getManagementNomenclature';
import {getPermissiveDocuments} from '../api/getPermissiveDocuments';
import {getProductModelNomenclature} from '../api/getProductModelNomenclature';
import {getSupplierDetails} from '../api/getSupplierDetails';
import {postSearchProducts} from '../api/postSearchProducts';
import {postSearchQualityActions} from '../api/postSearchQualityActions';
import {postSearchQualityDocuments} from '../api/postSearchQualityDocuments';
import {productsDocumentsFilters} from './slices/productsDocumentsSlice';
import {productsDocumentsTableData} from './slices/productsDocumentsTableDataSlice';
import {taskDetailsApi} from '../components/Tasks/TaskDetails/servicesTaskDetails';
import {productDetailsApi} from '../components/Products/ProductDetails/productDetailsApi';
import {providersApi} from '../components/Providers/services';

const rootReducer = {
    [getManagementNomenclature.reducerPath]: getManagementNomenclature.reducer,
    [getPermissiveDocuments.reducerPath]: getPermissiveDocuments.reducer,
    [getProductModelNomenclature.reducerPath]: getProductModelNomenclature.reducer,
    [getSupplierDetails.reducerPath]: getSupplierDetails.reducer,
    [modelsApi.reducerPath]: modelsApi.reducer,
    [postSearchProducts.reducerPath]: postSearchProducts.reducer,
    [postSearchQualityActions.reducerPath]: postSearchQualityActions.reducer,
    [postSearchQualityDocuments.reducerPath]: postSearchQualityDocuments.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [taskDetailsApi.reducerPath]: taskDetailsApi.reducer,
    [productDetailsApi.reducerPath]: productDetailsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [withModelApi.reducerPath]: withModelApi.reducer,
    [withoutModelApi.reducerPath]: withoutModelApi.reducer,
    productsDocumentsFilters: productsDocumentsFilters.reducer,
    productsDocumentsTableData: productsDocumentsTableData.reducer,
};

const createReducer = (injectedReducers = {}) =>
    combineReducers({
        ...rootReducer,
        ...injectedReducers,
    });

const makeStore = () =>
    configureStore({
        reducer: createReducer(),
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                getManagementNomenclature.middleware,
                getPermissiveDocuments.middleware,
                getProductModelNomenclature.middleware,
                getSupplierDetails.middleware,
                modelsApi.middleware,
                postSearchProducts.middleware,
                postSearchQualityActions.middleware,
                postSearchQualityDocuments.middleware,
                providersApi.middleware,
                taskDetailsApi.middleware,
                getSupplierDetails.middleware,
                getPermissiveDocuments.middleware,
                getProductModelNomenclature.middleware,
                postSearchQualityDocuments.middleware,
                productDetailsApi.middleware,
                tasksApi.middleware,
                withModelApi.middleware,
                withoutModelApi.middleware
            ),
        devTools: process.env.NODE_ENV === 'development',
    });

export const store = makeStore();
setupListeners(store.dispatch);

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
