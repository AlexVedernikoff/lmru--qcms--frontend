import format from 'date-fns/format';

export const convertDateFromServer = (date: string) => {
    try {
        const res = format(new Date(date), 'dd.MM.yyyy');
        return res;
    } catch (err) {
        return '';
    }
};

export const converStringToDateTime = (date: string | Date) => {
    try {
        const res = format(new Date(date), 'yyyy.MM.dd HH:mm:ss');
        return res;
    } catch (err) {
        return '';
    }
};
