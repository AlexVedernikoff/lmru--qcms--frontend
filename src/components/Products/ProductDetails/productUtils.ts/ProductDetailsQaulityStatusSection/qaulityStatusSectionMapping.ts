import {QualityStatus} from '../../../../../common/types/productDetails';

export enum EQualityStatusesEng {
    MissingData = 'MISSING_DATA',
    MissingDate = 'MISSING_DATE',
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

export enum ELanguages {
    RU = 'ru',
    ENG = 'eng',
}

export const getQualityStatus = (lang: string, qualityStatus?: string) => {
    if (lang === 'ru') {
        const statusMissingDataRu =
            qualityStatus === EQualityStatusesEng.MissingData || qualityStatus === EQualityStatusesEng.MissingDate
                ? EQualityStatusesRu.MissingData
                : '';
        const statusQualificationInProgressRu =
            qualityStatus === EQualityStatusesEng.QualificationInProgress
                ? EQualityStatusesRu.QualificationInProgress
                : '';
        const statusDocumentCollectionRu =
            qualityStatus === EQualityStatusesEng.DocumentCollection ? EQualityStatusesRu.DocumentCollection : '';
        const statusCertifiedRu = qualityStatus === EQualityStatusesEng.Certified ? EQualityStatusesRu.Certified : '';
        const statusNotCertifiedRu =
            qualityStatus === EQualityStatusesEng.NotCertified ? EQualityStatusesRu.NotCertified : '';
        const statusTemporarilyAllowedRu =
            qualityStatus === EQualityStatusesEng.TemporarilyAllowed ? EQualityStatusesRu.TemporarilyAllowed : '';

        if (statusMissingDataRu) {
            return statusMissingDataRu;
        } else if (statusQualificationInProgressRu) {
            return statusQualificationInProgressRu;
        } else if (statusDocumentCollectionRu) {
            return statusDocumentCollectionRu;
        } else if (statusCertifiedRu) {
            return statusCertifiedRu;
        } else if (statusNotCertifiedRu) {
            return statusNotCertifiedRu;
        } else if (statusTemporarilyAllowedRu) {
            return statusTemporarilyAllowedRu;
        } else {
            return '';
        }
    } else {
        const statusMissingDataEng =
            qualityStatus === EQualityStatusesRu.MissingData ? EQualityStatusesEng.MissingData : '';
        const statusQualificationInProgressEng =
            qualityStatus === EQualityStatusesRu.QualificationInProgress
                ? EQualityStatusesEng.QualificationInProgress
                : '';
        const statusDocumentCollectionEng =
            qualityStatus === EQualityStatusesRu.DocumentCollection ? EQualityStatusesEng.DocumentCollection : '';
        const statusCertifiedEng = qualityStatus === EQualityStatusesRu.Certified ? EQualityStatusesEng.Certified : '';
        const statusNotCertifiedEng =
            qualityStatus === EQualityStatusesRu.NotCertified ? EQualityStatusesEng.NotCertified : '';
        const statusTemporarilyAllowedEng =
            qualityStatus === EQualityStatusesRu.TemporarilyAllowed ? EQualityStatusesEng.TemporarilyAllowed : '';

        if (statusMissingDataEng) {
            return statusMissingDataEng;
        } else if (statusQualificationInProgressEng) {
            return statusQualificationInProgressEng;
        } else if (statusDocumentCollectionEng) {
            return statusDocumentCollectionEng;
        } else if (statusCertifiedEng) {
            return statusCertifiedEng;
        } else if (statusNotCertifiedEng) {
            return statusNotCertifiedEng;
        } else if (statusTemporarilyAllowedEng) {
            return statusTemporarilyAllowedEng;
        } else {
            return '';
        }
    }
};

const arrQstatusesRu = [
    EQualityStatusesRu.MissingData,
    EQualityStatusesRu.QualificationInProgress,
    EQualityStatusesRu.DocumentCollection,
    EQualityStatusesRu.Certified,
    EQualityStatusesRu.NotCertified,
    EQualityStatusesRu.TemporarilyAllowed,
];

export const qaulityStatusSectionMapping = (qStatus?: QualityStatus) => {
    const buCodeText =
        qStatus?.buCode && qStatus.buCode === 9
            ? 'Леруа Мерлен Россия'
            : qStatus?.buCode && qStatus.buCode === 2
            ? 'Леруа Мерлен Казахстан'
            : qStatus?.buCode;
    const buCode = qStatus?.buCode;
    const qualityStatus = {ru: getQualityStatus(ELanguages.RU, qStatus?.qualityStatus), eng: qStatus?.qualityStatus};

    const blockedForOrders = qStatus?.blockedForOrder;
    const blockedForSellings = qStatus?.blockedForSelling;
    const blockedForPublics = qStatus?.blockedForPublication;

    return {
        buCode,
        buCodeText,
        qualityStatus,
        blockedForOrders,
        blockedForSellings,
        blockedForPublics,
        arrQstatusesRu,
    };
};
