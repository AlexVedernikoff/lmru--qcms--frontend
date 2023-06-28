export interface IUpdateProductsRequestHeader {
    securityCode: string;
}

export interface IUpdateProductsRequestBody {
    updatedBy: string;
    products: ProductDataUpdate[];
}

export interface IUpdateProductsRequest {
    header: IUpdateProductsRequestHeader;
    body: IUpdateProductsRequestBody;
}

interface ProductDataUpdate {
    id: number; // required, иднетификатор товара в системе
    qualityModelId?: string; // optional, изменение модели качества
    productWithSubstances?: boolean; // optional, изменение флага
    quality?: {
        buCode: number; // required, номер BU для которого обновляем статус
        quality?: {
            // optional, обновление статуса
            qualityStatus: string; // required, новое значение для статуса, ENUM ['MISSING_DATA', 'QUALIFICATION_IN_PROGRESS', 'DOCUMENT_COLLECTION', 'CERTIFIED', 'NOT_CERTIFIED', 'TEMPORARILY_ALLOWED']
            comment: string; // optional, комментарий для изменения статуса
        };
        orderBlocking?: {
            blockedForOrdering: boolean; // required, новое значения флага блокировки заказа
            orderBlockComment: string; // required, комментарий
        };
        publicationBlocking?: {
            blockedForPublication: boolean; // required, новое значения флага блокировки заказа
            publicationBlockComment: string; // required, комментарий
        };
        sellingBlocking?: {
            blockedForSelling: boolean; // required, новое значения флага блокировки заказа
            sellingBlockComment: string; // required, комментарий
        };
    };
}

export interface IUpdateProductsResponse {}
