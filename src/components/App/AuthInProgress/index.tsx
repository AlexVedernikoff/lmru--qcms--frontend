import {authApi} from 'api/auth';
import {UnauthorizedError, UserData} from 'common/types/auth';
import {Loader} from 'fronton-react';
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'store';
import {userReducer, userStoreActions} from 'store/slices/authSlice';
import {useQueryParams} from 'hooks/useQueryParams';
import {AuthStatus} from 'common/types/user';

const isUnauthorizedError = (error: any): error is UnauthorizedError => {
    if (!error || typeof error !== 'object') return false;
    return error.status === 401 && typeof error.data?.redirect_uri === 'string';
};

const isUserData = (data: any): data is UserData => {
    if (!data || typeof data !== 'object') return false;

    return (
        typeof data.userName === 'string' &&
        typeof data.accessToken === 'string' &&
        typeof data.accessToken === 'string' &&
        typeof data.roles === 'string' &&
        typeof data.supplierCommercialIds === 'string'
    );
};

const getUserDataFromLocalStorage = () => {
    const data = localStorage.getItem(userReducer.name);
    if (!data) return;
    const userData = JSON.parse(data);
    return isUserData(userData) ? userData : undefined;
};

const AuthInProgress = () => {
    const userStore = useAppSelector(state => state.userStore);
    const queryParams = useQueryParams();
    const dispatch = useAppDispatch();
    const [auth, authRequestState] = authApi.useAuthMutation();

    const handleAuthSuccess = useCallback(
        (userData: UserData) => {
            localStorage.setItem(userReducer.name, JSON.stringify(userData));
            dispatch(userStoreActions.setAuthSuccessState(userData));
        },
        [dispatch]
    );

    useEffect(() => {
        if (authRequestState.isLoading) return;

        if (authRequestState.isError) {
            const {error} = authRequestState;
            if (isUnauthorizedError(error)) {
                window.location.href = error.data.redirect_uri;
            } else {
                dispatch(userStoreActions.setAuthErrorState());
            }
            return;
        }

        if (authRequestState.isSuccess) {
            handleAuthSuccess(authRequestState.data);
            return;
        }

        if (userStore.authStatus === AuthStatus.NeedToRefreshTokens) {
            auth({
                header: {
                    securityCode: '',
                    accesstoken: userStore.userData!.accessToken,
                    refreshtoken: userStore.userData!.refreshToken,
                },
            });
            return;
        }

        const userDataFromLocalStorage = getUserDataFromLocalStorage();
        if (userDataFromLocalStorage) {
            handleAuthSuccess(userDataFromLocalStorage);
            return;
        }

        const authorizationcode = queryParams.get('code') || undefined;

        auth({
            header: {
                securityCode: 'security_code',
                authorizationcode,
            },
        });

        return () => authRequestState.reset();
    }, [authRequestState, dispatch, handleAuthSuccess, auth, queryParams, userStore]);

    return <Loader />;
};

export default AuthInProgress;
