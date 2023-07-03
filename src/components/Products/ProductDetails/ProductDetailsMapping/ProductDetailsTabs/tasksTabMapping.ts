import {TFunction} from 'i18next';
import {QualityAction} from '../../../../../common/types/productDetails';

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

        return {
            id: qAction?.id,
            categoryTypeName: qAction?.categoryTypeName,
            actionStatus: translateStatus,
            uploadedDocumentId: qAction?.documents?.uploadedDocuments
                ? qAction.documents.uploadedDocuments.find(doc => doc.id === productId)?.id
                : '',
            supDataName: qAction?.supplierData?.name,
            supDatasupplierRMSCode: qAction?.supplierData?.supplierRMSCode,
            approversTypeQE: qAction?.approvers
                ? qAction?.approvers.find(approver => approver.type === Approvers.QE)?.externalId
                : '',
            approversTypeSQM: qAction?.approvers
                ? qAction?.approvers.find(approver => approver.type === Approvers.SQM)?.externalId
                : '',
            tasks: qAction?.id,
            awaitedDocuments: qAction?.documents?.awaitedDocuments ? qAction?.documents?.awaitedDocuments[0]?.type : '',
            categoryName: qAction?.categoryName,
            createdAt: qAction?.creationInformation.createdAt,
            approvalDueDate: qAction?.approvalDueDate,
            responsible: qAction?.responsible ? qAction?.responsible[0].externalId : '',
            publicComments: qAction?.publicComments && qAction?.publicComments.length > 0 ? qAction.publicComments : [],
        };
    });

    return qActionsRows;
};
