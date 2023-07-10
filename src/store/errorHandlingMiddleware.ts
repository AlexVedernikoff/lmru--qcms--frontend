import {Middleware, MiddlewareAPI, isRejected} from '@reduxjs/toolkit';
import {userStoreActions} from './slices/authSlice';

export const errorHandlingMiddleware: Middleware = (middlewareAPI: MiddlewareAPI) => next => action => {
    if (isRejected(action) && action.payload.status === 401) {
        middlewareAPI.dispatch(userStoreActions.setAuthNeedToRefreshTokensState());
    }

    return next(action);
};
