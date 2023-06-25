export interface IQualityProductDetailsParams {
    productId: string;
    securityCode: string;
    mockIdsForQuery: IQueriesObj;
}

interface IQueriesObj {
    qualityModelId?: string;
    documentIds?: string[];
    qualityActionIds?: string[];
}
