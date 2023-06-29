interface IProductsSendQualityMessageRequestHeader {
    securityCode: string;
}

interface IProductsSendQualityMessageRequestBody {
    ids: number[]; // Айдишники товаров
}

export interface IProductsSendQualityMessageRequest {
    header: IProductsSendQualityMessageRequestHeader;
    body: IProductsSendQualityMessageRequestBody;
}

export interface IProductsSendQualityMessageResponse {}
