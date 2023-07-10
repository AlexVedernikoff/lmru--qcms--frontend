import {UserData} from './auth';

export enum AuthStatus {
    UnAuthorized = 'UnAuthorized',
    NeedToRefreshTokens = 'NeedToRefreshTokens',
    AuthError = 'AuthError',
    AuthSuccess = 'AuthSuccess',
}

export interface UserState {
    authStatus: AuthStatus;
    userData?: UserData;
}
