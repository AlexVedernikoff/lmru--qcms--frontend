import {ICommonProductFields, IDataDeatailsQstatus} from '../../../../common/types/productDetails';

export const prepareUpdateBody = (tableData: IDataDeatailsQstatus[], commonProductFields: ICommonProductFields) => {
    const products = tableData.map(tableRow => {
        return {
            id: Number(commonProductFields.productId),
            qualityModelId: commonProductFields?.qualityModelId,
            isProductWithSubstances: commonProductFields?.productWithSubstances,
            quality: {
                buCode: tableRow?.bu,
                quality: {
                    qualityStatus: tableRow?.engStatus,
                    comment: tableRow?.statusComment,
                },
                orderBlocking: {
                    blockedForOrdering: tableRow?.blockOrders,
                    orderBlockComment: 'string',
                },
                publicationBlocking: {
                    blockedForPublication: tableRow?.blockPublics,
                    publicationBlockComment: 'string',
                },
                sellingBlocking: {
                    blockedForSelling: tableRow?.blockSellings,
                    sellingBlockComment: 'string',
                },
            },
        };
    });

    const result = {
        updatedBy: 'mock user2',
        products,
    };

    return result;
};
