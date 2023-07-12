import {TFunction} from 'i18next';
import {History} from '../../../../../common/types/productDetails';
import {EQualityStatusesEng} from './qaulityStatusSectionMapping';

export const prepareHistoryColumns = (t: TFunction<'products', undefined, 'products'>) => {
    return [
        {
            title: 'Предыдущие значения',
            dataIndex: 'previousValue',
            width: 70,
            render: (previousValue: History['previousValue']) => {
                let value;
                if (previousValue === 'true') {
                    value = 'BLOCKED';
                } else if (previousValue === 'false') {
                    value = 'UNBLOCKED';
                } else {
                    value = previousValue;
                }
                return <>{t(`ProductDetails.QualityStatusSection.Table.Statuses.${value as EQualityStatusesEng}`)}</>;
            },
        },
        {
            title: 'Дата обновления',
            dataIndex: 'statusUpdatedAt',
            width: 50,
            render: (statusUpdatedAt: History['statusUpdatedAt']) => (statusUpdatedAt ? statusUpdatedAt : '-'),
        },
        {
            title: 'Пользователь',
            dataIndex: 'statusUpdatedBy',
            width: 50,
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            width: 80,
        },
    ];
};
