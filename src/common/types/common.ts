export interface IPageable {
    pageSize: number;
    pageIndex: number;
    totalPages: number;
    totalElements: number;
}

export interface IErrorBasic {
    code: number;
    message: string;
}

export interface IErrorResponse {
    errors: IErrorBasic[];
}

export enum EBUCodes {
    Russia = '9',
}
