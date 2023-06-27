const getQualityStatus = (qualityStatusFromServer?: string) => {
    enum EQualityStatusEng {
        MissingData = 'MISSING_DATA',
        QualificationInProgress = 'QUALIFICATION_IN_PROGRESS',
        DocumentCollection = 'DOCUMENT_COLLECTION',
        Certified = 'CERTIFIED',
        NotCertified = 'NOT_CERTIFIED',
        TemporarilyAllowed = 'TEMPORARILY_ALLOWED',
    }

    enum EQualityStatusRu {
        MissingData = 'Отсутствуют данные о качестве',
        QualificationInProgress = 'Квалификация',
        DocumentCollection = 'Сбор документации',
        Certified = 'Сертифицирован',
        NotCertified = 'Не сертифицирован',
        TemporarilyAllowed = 'Временно сертифицирован',
    }

    const statusMissingData =
        qualityStatusFromServer === EQualityStatusEng.MissingData ? EQualityStatusRu.MissingData : '';
    const statusQualificationInProgress =
        qualityStatusFromServer === EQualityStatusEng.QualificationInProgress
            ? EQualityStatusRu.QualificationInProgress
            : '';
    const statusDocumentCollection =
        qualityStatusFromServer === EQualityStatusEng.DocumentCollection ? EQualityStatusRu.DocumentCollection : '';
    const statusCertified = qualityStatusFromServer === EQualityStatusEng.Certified ? EQualityStatusRu.Certified : '';
    const statusNotCertified =
        qualityStatusFromServer === EQualityStatusEng.NotCertified ? EQualityStatusRu.NotCertified : '';
    const statusTemporarilyAllowed =
        qualityStatusFromServer === EQualityStatusEng.TemporarilyAllowed ? EQualityStatusRu.TemporarilyAllowed : '';

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

export const qaulityStatusSectionMapping = (details: any) => {
    const buCode = details?.qualityStatuses?.buCode;
    const qualityStatus = getQualityStatus(details?.qualityStatuses?.qualityStatus);
    const blockedForOrder = details?.qualityStatuses?.blockedForOrder;
    const blockedForSelling = details?.qualityStatuses?.blockedForSelling;
    const blockedForPublication = details?.qualityStatuses?.blockedForPublication;
    // const comment =  details?.qualityAction?.publicComments?.comment;

    return {
        buCode,
        qualityStatus,
        blockedForOrder,
        blockedForSelling,
        blockedForPublication,
    };
};
