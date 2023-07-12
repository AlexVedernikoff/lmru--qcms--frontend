import {TFunction} from 'i18next';
import {History, QualityStatus} from '../../../../../common/types/productDetails';
import {converStringToDateTime, getDateTimeUtcThree} from '../../../../../utils/convertDateFromServer';

// to do: err enum on BE. After fix change MissingDate to MissingData

export enum EQualityStatusesEng {
    MissingDate = 'MISSING_DATE',
    QualificationInProgress = 'QUALIFICATION_IN_PROGRESS',
    DocumentCollection = 'DOCUMENT_COLLECTION',
    Certified = 'CERTIFIED',
    NotCertified = 'NOT_CERTIFIED',
    TemporarilyAllowed = 'TEMPORARILY_ALLOWED',
    Blocked = 'BLOCKED',
    Unblocked = 'UNBLOCKED',
}

export enum EQualityStatusesRu {
    MissingDate = 'Отсутствуют данные о качестве',
    QualificationInProgress = 'Квалификация',
    DocumentCollection = 'Сбор документации',
    Certified = 'Сертифицирован',
    NotCertified = 'Не сертифицирован',
    TemporarilyAllowed = 'Временно сертифицирован',
}

export const getQualityStatus = (lang: string, qualityStatus?: string) => {
    if (lang === 'ru') {
        const statusMissingDataRu =
            qualityStatus === EQualityStatusesEng.MissingDate ? EQualityStatusesRu.MissingDate : '';

        const statusMissingDateRu =
            qualityStatus === EQualityStatusesEng.MissingDate ? EQualityStatusesRu.MissingDate : '';

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
        } else if (statusMissingDateRu) {
            return statusMissingDateRu;
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
            qualityStatus === EQualityStatusesRu.MissingDate ? EQualityStatusesEng.MissingDate : '';
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
    EQualityStatusesRu.MissingDate,
    EQualityStatusesRu.QualificationInProgress,
    EQualityStatusesRu.DocumentCollection,
    EQualityStatusesRu.Certified,
    EQualityStatusesRu.NotCertified,
    EQualityStatusesRu.TemporarilyAllowed,
];

const sortAndFormateDatesArray = (array: History[]) => {
    const formatedDateHistory = [...array].map(el => {
        if (el.statusUpdatedAt) {
            return {...el, statusUpdatedAt: getDateTimeUtcThree(el.statusUpdatedAt, 'yyyy.MM.dd HH:mm:ss')};
        } else {
            return el;
        }
    });

    return [...formatedDateHistory].sort((a: History, b: History) => {
        const dateA: any = a.statusUpdatedAt ? new Date(converStringToDateTime(a.statusUpdatedAt)) : null;
        const dateB: any = b.statusUpdatedAt ? new Date(converStringToDateTime(b.statusUpdatedAt)) : null;

        if (dateA && dateB) {
            return dateB - dateA;
        } else if (dateA) {
            return -1;
        } else if (dateB) {
            return 1;
        } else {
            return 0;
        }
    });
};

export const qaulityStatusSectionMapping = (
    t: TFunction<'products', undefined, 'products'>,
    i: number,
    qStatus?: QualityStatus
) => {
    const buCodeText =
        qStatus?.buCode && qStatus.buCode === 9
            ? 'Леруа Мерлен Россия'
            : qStatus?.buCode && qStatus.buCode === 2
            ? 'Леруа Мерлен Казахстан'
            : '-';
    const buCode = qStatus?.buCode ? `${qStatus.buCode}` : '-';

    const engStatus = qStatus?.qualityStatus;
    // @ts-ignore-next-line
    const ruStatus = t(`ProductDetails.QualityStatusSection.Table.Statuses.${qStatus?.qualityStatus}`) as string;

    const blockedForOrders = qStatus?.blockedForOrder;
    const blockedForSellings = qStatus?.blockedForSelling;
    const blockedForPublics = qStatus?.blockedForPublication;

    const statusRowHistory = qStatus?.qualityStatusHistory && sortAndFormateDatesArray(qStatus.qualityStatusHistory);

    const ordersRowHistory = qStatus?.orderBlockHistory && sortAndFormateDatesArray(qStatus.orderBlockHistory);
    const sellingsRowHistory = qStatus?.sellingBlockHistory && sortAndFormateDatesArray(qStatus.sellingBlockHistory);
    const publicationsRowHistory =
        qStatus?.publicationBlockHistory && sortAndFormateDatesArray(qStatus.publicationBlockHistory);

    return {
        id: `${i}`,
        bu: buCode,
        buCodeText: buCodeText,
        statuses: arrQstatusesRu,

        ruStatus: ruStatus,
        engStatus: engStatus,
        initialStatusRu: ruStatus,
        initialStatusEng: engStatus,
        isStatusCommentOpened: false,
        statusComment: '',
        isValidStatus: true,
        isStatusHistoryOpened: false,
        statusRowHistory: statusRowHistory,
        isStatusChanged: false,

        blockOrders: blockedForOrders || false,
        initialBlockOrders: blockedForOrders || false,
        blockOrdersComment: '',
        isBlockOrderOpened: false,
        isValidBlockOrders: true,
        isOrdersHistoryOpened: false,
        ordersRowHistory: ordersRowHistory,
        isBlockOredersChanged: false,

        blockSellings: blockedForSellings || false,
        initialBlockSellings: blockedForSellings || false,
        blockSellingsComment: '',
        isBlockSellingsOpened: false,
        isValidBlockSellings: true,
        isSellingsHistoryOpened: false,
        sellingsRowHistory: sellingsRowHistory,
        isBlockSellingsChanged: false,

        blockPublics: blockedForPublics || false,
        initialBlockPublics: blockedForPublics || false,
        blockPublicsComment: '',
        isBlockPublicsOpened: false,
        isValidBlockPublics: true,
        isPublicationsHistoryOpened: false,
        publicationsRowHistory: publicationsRowHistory,
        isBlockPublicsChanged: false,
    };
};
