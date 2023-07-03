import {History} from '../../../../../common/types/productDetails';

export const prepareHistoryColumns = (statusRowHistory: History[]) => {
    return [
        {
            title: 'Предыдущие значение',
            dataIndex: 'previousValue',
        },
        {
            title: 'Дата обновления',
            dataIndex: 'statusUpdatedAt',
        },
        {
            title: 'Пользователь',
            dataIndex: 'statusUpdatedBy',
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
        },
    ];
};
