import format from 'date-fns/format';

export const convertDateFromServer = (date: string) => {
    const res = format(new Date(date), 'dd.MM.yyyy');
    return res;
};

export const converStringToDateTime = (date: string) => {
    const res = format(new Date(date), 'yyyy/MM/dd HH:mm:ss');
    return res;
};
