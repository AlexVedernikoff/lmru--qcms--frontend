import {format as tzFormat, utcToZonedTime} from 'date-fns-tz';
import {format} from 'date-fns';

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

export const getDateTimeUtcThree = (dateString: string, formatDateTime: 'yyyy.MM.dd HH:mm:ss' | 'dd.MM.yyyy') => {
    try {
        const parsedTime = new Date(dateString);
        parsedTime.setUTCHours(parsedTime.getUTCHours() + 3);
        const tz = 'Europe/Moscow';
        const formattedTime = tzFormat(utcToZonedTime(parsedTime, tz), formatDateTime, {timeZone: tz});
        return formattedTime;
    } catch (err) {
        return '';
    }
};
