import {EQualityStatusesEng, EQualityStatusesRu} from '../../ProductDetailsQualityStatusSection';

const getQualityStatus = (qualityStatusFromServer?: string) => {
    const statusMissingData =
        qualityStatusFromServer === EQualityStatusesEng.MissingData ? EQualityStatusesRu.MissingData : '';
    const statusQualificationInProgress =
        qualityStatusFromServer === EQualityStatusesEng.QualificationInProgress
            ? EQualityStatusesRu.QualificationInProgress
            : '';
    const statusDocumentCollection =
        qualityStatusFromServer === EQualityStatusesEng.DocumentCollection ? EQualityStatusesRu.DocumentCollection : '';
    const statusCertified =
        qualityStatusFromServer === EQualityStatusesEng.Certified ? EQualityStatusesRu.Certified : '';
    const statusNotCertified =
        qualityStatusFromServer === EQualityStatusesEng.NotCertified ? EQualityStatusesRu.NotCertified : '';
    const statusTemporarilyAllowed =
        qualityStatusFromServer === EQualityStatusesEng.TemporarilyAllowed ? EQualityStatusesRu.TemporarilyAllowed : '';

    if (statusMissingData) {
        return statusMissingData;
    } else if (statusQualificationInProgress) {
        return statusQualificationInProgress;
    } else if (statusDocumentCollection) {
        return statusDocumentCollection;
    } else if (statusCertified) {
        return statusCertified;
    } else if (statusNotCertified) {
        return statusNotCertified;
    } else if (statusTemporarilyAllowed) {
        return statusTemporarilyAllowed;
    } else {
        return '';
    }
};

export const qaulityStatusSectionMapping = (qStatus?: any) => {
    const buCode =
        qStatus?.buCode && qStatus.buCode === 9
            ? 'Леруа Мерлен Россия'
            : qStatus?.buCode && qStatus.buCode === 2
            ? 'Леруа Мерлен Казахстан'
            : qStatus?.buCode;
    const qualityStatus = getQualityStatus(qStatus?.qualityStatus);
    const blockedForOrders = qStatus?.blockedForOrder;
    const blockedForSellings = qStatus?.blockedForSelling;
    const blockedForPublics = qStatus?.blockedForPublication;
    // const comment =  details?.qualityAction?.publicComments?.comment;

    return {
        buCode,
        qualityStatus,
        blockedForOrders,
        blockedForSellings,
        blockedForPublics,
    };
};
