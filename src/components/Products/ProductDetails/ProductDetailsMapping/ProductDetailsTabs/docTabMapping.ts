import {TFunction} from 'i18next';
import {UploadedDocument} from '../../../../../common/types/productDetails';

export const docTabMapping = (
    uploadedDocuments: UploadedDocument[],
    productId: string,
    t: TFunction<'products', undefined, 'products'>
) => {
    const docTabRows = uploadedDocuments.map(doc => {
        const status = doc?.productsDetails.find(el => el?.productId === parseInt(productId, 10))?.approvingStatus;
        // @ts-ignore-next-line
        const translateStatus = t(`ProductDetails.ProductDetailsTabs.DocumentsTab.StatusesOptions.${status}`) as string;
        const translatedStatus = status ? translateStatus : '';

        return {
            type: doc?.type,
            fileName: doc?.fileName,
            arppovingStatus: translatedStatus,
            isForLot: doc?.isForLot,
            createdAt: doc?.creationInformation.createdAt,
            issueDate: doc?.issueDate,
            expireDate: doc?.expireDate,
            mask: doc?.mask,
            id: doc?.id,
        };
    });

    return docTabRows;
};
