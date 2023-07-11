import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {EUserRole} from 'common/roles';
import {UserData} from 'common/types/auth';
import {UserState, AuthStatus} from 'common/types/user';
import {isDevEnvironment} from 'utils/isDevEnvironment';

const mockUserState: UserState = {
    authStatus: AuthStatus.AuthSuccess,
    userData: {
        userName: 'Тест Тестович',
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        roles: [],
        supplierCommercialIds: '',
    },
};

const initialState = isDevEnvironment()
    ? mockUserState
    : {
          authStatus: AuthStatus.UnAuthorized,
      };

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
        clickRole(state, action: PayloadAction<EUserRole>) {
            const {userData} = state;
            if (!isDevEnvironment() || !userData) return state;
            const clickedRole = action.payload;
            const {roles} = userData;

            return {
                ...state,
                userData: {
                    ...userData,
                    roles: roles.includes(clickedRole)
                        ? roles.filter(role => role !== clickedRole)
                        : [...roles, clickedRole],
                },
            };
        },
    },
});

export const userStoreActions = slice.actions;

export const userReducer = slice.reducer;
