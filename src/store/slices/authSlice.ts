import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {UserData} from 'common/types/auth';
import {UserState, AuthStatus} from 'common/types/user';

const initialState = {
    authStatus: AuthStatus.UnAuthorized,
} as UserState;

const name = 'userStore';

const slice = createSlice({
    name,
    initialState,
    reducers: {
        setAuthNeedToRefreshTokensState(state) {
            if (state.authStatus === AuthStatus.AuthSuccess) {
                return {
                    ...state,
                    authStatus: AuthStatus.NeedToRefreshTokens,
                };
            }
            return state;
        },
        setAuthErrorState() {
            return {
                authStatus: AuthStatus.AuthError,
            };
        },
        setAuthSuccessState(state, action: PayloadAction<UserData>) {
            return {
                authStatus: AuthStatus.AuthSuccess,
                userData: action.payload,
            };
        },
        logout() {
            localStorage.removeItem(name);
            return {
                authStatus: AuthStatus.UnAuthorized,
            };
        },
    },
});

export const userStoreActions = slice.actions;

export const userReducer = slice.reducer;
