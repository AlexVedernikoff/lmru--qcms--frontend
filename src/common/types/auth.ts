import {EUserRole} from 'common/roles';

export interface AuthRequestHeader {
    securityCode: string;
    accesstoken?: string;
    refreshtoken?: string;
    authorizationcode?: string;
}

export interface AuthRequest {
    header: AuthRequestHeader;
}

export interface UserData {
    userName: string;
    accessToken: string;
    refreshToken: string;
    roles: EUserRole[];
    supplierCommercialIds: string;
}

export interface UnauthorizedError {
    status: 401;
    data: {
        redirect_uri: string;
    };
}
