export enum EQualityStatusesEng {
    MissingData = 'MISSING_DATA',
    QualificationInProgress = 'QUALIFICATION_IN_PROGRESS',
    DocumentCollection = 'DOCUMENT_COLLECTION',
    Certified = 'CERTIFIED',
    NotCertified = 'NOT_CERTIFIED',
    TemporarilyAllowed = 'TEMPORARILY_ALLOWED',
}

export enum EQualityStatusesRu {
    MissingData = 'Отсутствуют данные о качестве',
    QualificationInProgress = 'Квалификация',
    DocumentCollection = 'Сбор документации',
    Certified = 'Сертифицирован',
    NotCertified = 'Не сертифицирован',
    TemporarilyAllowed = 'Временно сертифицирован',
}

const arrQstatusesRu = [
    EQualityStatusesRu.MissingData,
    EQualityStatusesRu.QualificationInProgress,
    EQualityStatusesRu.DocumentCollection,
    EQualityStatusesRu.Certified,
    EQualityStatusesRu.NotCertified,
    EQualityStatusesRu.TemporarilyAllowed,
];

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
    const qualityStatus = {ru: getQualityStatus(qStatus?.qualityStatus), eng: qStatus?.qualityStatus};
    const blockedForOrders = qStatus?.blockedForOrder;
    const blockedForSellings = qStatus?.blockedForSelling;
    const blockedForPublics = qStatus?.blockedForPublication;
    const qualityModelId = qStatus?.qualityModelId;

    // const comment =  details?.qualityAction?.publicComments?.comment;

    return {
        buCode,
        qualityStatus,
        blockedForOrders,
        blockedForSellings,
        blockedForPublics,
        arrQstatusesRu,
        qualityModelId,
    };
};
