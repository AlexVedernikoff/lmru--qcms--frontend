import {ICommonProductFields, IDataDeatailsQstatus} from '../../../../../common/types/productDetails';
import {mockUser} from '../../mockProductDetails';

export const prepareUpdateBody = (tableData: IDataDeatailsQstatus[], commonProductFields: ICommonProductFields) => {
    const products = tableData.map(tableRow => {
        const product = {
            id: parseInt(commonProductFields.productId, 10),
            qualityModelId: commonProductFields?.qualityModelId,
            isProductWithSubstances: commonProductFields?.productWithSubstances,
            quality: {
                buCode: tableRow?.bu ? parseInt(tableRow?.bu) : 0,
            },
        };

        const qualityObj = {};

        if (tableRow?.statusComment) {
            Object.assign(qualityObj, {
                quality: {
                    qualityStatus: tableRow?.engStatus,
                    comment: tableRow?.statusComment,
                },
            });
        }

        if (tableRow?.blockOrdersComment) {
            Object.assign(qualityObj, {
                orderBlocking: {
                    blockedForOrdering: tableRow?.blockOrders,
                    orderBlockComment: tableRow.blockOrdersComment,
                },
            });
        }

        if (tableRow?.blockPublicsComment) {
            Object.assign(qualityObj, {
                publicationBlocking: {
                    blockedForPublication: tableRow?.blockPublics,
                    publicationBlockComment: tableRow.blockPublicsComment,
                },
            });
        }

        if (tableRow?.blockSellingsComment) {
            Object.assign(qualityObj, {
                sellingBlocking: {
                    blockedForSelling: tableRow?.blockSellings,
                    sellingBlockComment: tableRow.blockSellingsComment,
                },
            });
        }

        if (
            tableRow?.statusComment ||
            tableRow?.blockOrdersComment ||
            tableRow?.blockPublicsComment ||
            tableRow?.blockSellingsComment
        ) {
            Object.assign(product.quality, qualityObj);
        }

        return product;
    });

    const result = {
        updatedBy: mockUser,
        products,
    };

    return result;
};
