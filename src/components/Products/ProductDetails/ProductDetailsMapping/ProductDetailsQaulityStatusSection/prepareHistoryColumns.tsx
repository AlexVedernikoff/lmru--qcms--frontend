import {History} from '../../../../../common/types/productDetails';

export const prepareHistoryColumns = (statusRowHistory: History[]) => {
    return [
        {
            title: 'Предыдущие значения',
            dataIndex: 'previousValue',
            width: 70,
        },
        {
            title: 'Дата обновления',
            dataIndex: 'statusUpdatedAt',
            width: 50,
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
