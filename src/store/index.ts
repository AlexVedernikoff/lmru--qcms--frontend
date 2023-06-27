import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import modelsApi from '../components/Models/modelsApi';
import withModelApi from '../components/Products/WithQualityModel/withModelApi';
import {getManagementNomenclature} from '../api/getManagementNomenclature';
import {getPermissiveDocuments} from '../api/getPermissiveDocuments';
import {getProductModelNomenclature} from '../api/getProductModelNomenclature';
import {getSupplierDetails} from '../api/getSupplierDetails';
import {postSearchQualityDocuments} from '../api/postSearchQualityDocuments';
import {productsDocumentsFilters} from './slices/productsDocumentsSlice';
import {productsDocumentsTableData} from './slices/productsDocumentsTableDataSlice';
import {providersApi} from '../components/Providers/services';
import {taskDetailsApi} from '../components/Tasks/TaskDetails/servicesTaskDetails';
import {postSearchProducts} from '../api/postSearchProducts';
import {postSearchQualityActions} from '../api/postSearchQualityActions';

const rootReducer = {
    [getManagementNomenclature.reducerPath]: getManagementNomenclature.reducer,
    [getPermissiveDocuments.reducerPath]: getPermissiveDocuments.reducer,
    [getProductModelNomenclature.reducerPath]: getProductModelNomenclature.reducer,
    [getSupplierDetails.reducerPath]: getSupplierDetails.reducer,
    [modelsApi.reducerPath]: modelsApi.reducer,
    [postSearchProducts.reducerPath]: postSearchProducts.reducer,
    [postSearchQualityDocuments.reducerPath]: postSearchQualityDocuments.reducer,
    [postSearchQualityActions.reducerPath]: postSearchQualityActions.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [taskDetailsApi.reducerPath]: taskDetailsApi.reducer,
    [withModelApi.reducerPath]: withModelApi.reducer,
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
                postSearchQualityActions.middleware,
                getSupplierDetails.middleware,
                modelsApi.middleware,
                postSearchProducts.middleware,
                postSearchQualityDocuments.middleware,
                providersApi.middleware,
                taskDetailsApi.middleware,
                withModelApi.middleware
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
