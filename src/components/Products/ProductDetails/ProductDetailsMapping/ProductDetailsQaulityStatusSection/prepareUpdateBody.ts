import {ICommonProductFields, IDataDeatailsQstatus} from '../../../../../common/types/productDetails';
import {mockUser} from '../../mockProductDetails';

export const prepareUpdateBody = (tableData: IDataDeatailsQstatus[], commonProductFields: ICommonProductFields) => {
    const products = tableData.map(tableRow => {
        return {
            id: parseInt(commonProductFields.productId, 10),
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
                    orderBlockComment: tableRow.blockOrdersComment,
                },
                publicationBlocking: {
                    blockedForPublication: tableRow?.blockPublics,
                    publicationBlockComment: tableRow.blockPublicsComment,
                },
                sellingBlocking: {
                    blockedForSelling: tableRow?.blockSellings,
                    sellingBlockComment: tableRow.blockSellingsComment,
                },
            },
        };
    });

    const result = {
        updatedBy: mockUser,
        products,
    };

    return result;
};
