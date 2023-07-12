import {TFunction} from 'i18next';
import {QualityAction} from '../../../../../common/types/productDetails';
import {getDateTimeUtcThree} from '../../../../../utils/convertDateFromServer';

enum Approvers {
    QE = 'QE',
    SQM = 'SQM',
}

enum ETaskStatusesOptions {
    APPROVED = 'APPROVED',
    DRAFT = 'DRAFT',
    СANCELLED = 'СANCELLED',
    AWAITING_DOCUMENT_LOADING = 'AWAITING_DOCUMENT_LOADING',
    AWAITING_RESOLUTION = 'AWAITING_RESOLUTION',
    RETURNED_AWAITING_DOCUMENT_LOADING = 'RETURNED_AWAITING_DOCUMENT_LOADING',
    RETURNED_AWAITING_RESOLUTION = 'RETURNED_AWAITING_RESOLUTION',
}

export const tasksTabMapping = (
    qualityActions: QualityAction[],
    productId: string,
    t: TFunction<'products', undefined, 'products'>
) => {
    const qActionsRows = qualityActions.map(qAction => {
        const status = qAction?.actionStatus;
        const translateStatus = t(
            `ProductDetails.ProductDetailsTabs.TasksTab.StatusesOptions.${status as ETaskStatusesOptions}`
        ) as string;
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
                ? getDateTimeUtcThree(qAction.creationInformation.createdAt, 'yyyy.MM.dd HH:mm:ss')
                : '-',
            approvalDueDate: qAction?.approvalDueDate
                ? getDateTimeUtcThree(qAction.approvalDueDate, 'dd.MM.yyyy')
                : '-',
            responsible:
                qAction?.responsible && qAction?.responsible[0]?.externalId ? qAction?.responsible[0]?.externalId : '-',
            publicComments: qAction?.publicComments && qAction?.publicComments.length > 0 ? qAction.publicComments : [],
        };
    });

    return qActionsRows;
};
