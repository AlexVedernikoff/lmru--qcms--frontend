import format from 'date-fns/format';

export const convertDateFromServer = (date: string) => {
    const res = format(new Date(date), 'dd.MM.yyyy');
    return res;
};
