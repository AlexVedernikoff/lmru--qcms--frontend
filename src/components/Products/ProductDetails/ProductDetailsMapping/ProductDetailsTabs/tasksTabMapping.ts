import {TFunction} from 'i18next';
import {QualityAction} from '../../../../../common/types/productDetails';
import {converStringToDateTime, convertDateFromServer} from '../../../../../utils/convertDateFromServer';

enum Approvers {
    QE = 'QE',
    SQM = 'SQM',
}

export const tasksTabMapping = (
    qualityActions: QualityAction[],
    productId: string,
    t: TFunction<'products', undefined, 'products'>
) => {
    const qActionsRows = qualityActions.map(qAction => {
        const status = qAction?.actionStatus;
        // @ts-ignore-next-line
        const translateStatus = t(`ProductDetails.ProductDetailsTabs.TasksTab.StatusesOptions.${status}`) as string;
        const translatedStatus = status ? translateStatus : '';

        const uploadedDocumentId = qAction?.documents?.uploadedDocuments?.find(doc => doc.id === productId)?.id;
        const approversTypeQE = qAction?.approvers?.find(approver => approver.type === Approvers.QE)?.externalId;
        const approversTypeSQM = qAction?.approvers?.find(approver => approver.type === Approvers.SQM)?.externalId;
        return {
            id: qAction?.id ? `${qAction.id}` : '-',
            categoryTypeName: qAction?.categoryTypeName ? qAction?.categoryTypeName : '-',
            actionStatus: translatedStatus,
            uploadedDocumentId: uploadedDocumentId ? uploadedDocumentId : '-',
            supDataName: qAction?.supplierData?.name ? qAction?.supplierData?.name : '-',
            supDatasupplierRMSCode: qAction?.supplierData?.supplierRMSCode,
            approversTypeQE: approversTypeQE ? approversTypeQE : '-',
            approversTypeSQM: approversTypeSQM ? approversTypeSQM : '-',
            tasks: qAction?.id ? `${qAction.id}` : '-',
            awaitedDocuments: qAction?.documents?.awaitedDocuments
                ? qAction?.documents?.awaitedDocuments[0]?.type
                : '-',
            categoryName: qAction?.categoryName ? qAction?.categoryName : '-',
            createdAt: qAction?.creationInformation?.createdAt
                ? converStringToDateTime(qAction.creationInformation.createdAt)
                : '-',
            approvalDueDate: qAction?.approvalDueDate ? convertDateFromServer(qAction.approvalDueDate) : '-',
            responsible:
                qAction?.responsible && qAction?.responsible[0]?.externalId ? qAction?.responsible[0]?.externalId : '-',
            publicComments: qAction?.publicComments && qAction?.publicComments.length > 0 ? qAction.publicComments : [],
        };
    });

    return qActionsRows;
};
