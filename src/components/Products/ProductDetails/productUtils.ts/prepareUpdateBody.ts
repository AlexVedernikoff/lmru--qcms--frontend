export const prepareUpdateBody = (tableData: any, commonProductFields: any) => {
    const products = tableData.map((tableRow: any) => {
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
        updatedBy: 'mock user',
        products,
    };

    return result;
};
