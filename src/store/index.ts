import {configureStore, ThunkAction, Action, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {counterSlice} from './slices/exampleSlice';
import {commonSlice} from './slices/common';
import modelsApi from '../components/Models/modelsApi';
import {providersApi} from '../components/Providers/services';
import {getSupplierDetails} from '../api/getSupplierDetails';

const rootReducer = {
    common: commonSlice.reducer,
    counter: counterSlice.reducer,
    [modelsApi.reducerPath]: modelsApi.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [getSupplierDetails.reducerPath]: getSupplierDetails.reducer,
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
            getDefaultMiddleware()
                .concat(modelsApi.middleware, providersApi.middleware)
                .concat(getSupplierDetails.middleware),
        devTools: process.env.NODE_ENV === 'development',
    });

export const store = makeStore();
setupListeners(store.dispatch);

export type TAppDispatch = typeof store.dispatch;
export type TRootState = ReturnType<typeof store.getState>;
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: TRootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
    (amount: number): TAppThunk =>
    (dispatch, getState) => {
        const currentValue = selectCount(getState());
        if (currentValue % 2 === 1) {
            dispatch(counterSlice.actions.incrementByAmount(amount));
        }
    };
