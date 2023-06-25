interface QueriesObj {
    [key: string]: any;
}

const addAmpersandOrNot = (str: string) => {
    const url = str === '?' || str === '&' || str === '' ? '' : '&';
    return url;
};

const fillStr = (str: string, arr: string[], queryKey: string) => {
    let url = addAmpersandOrNot(str);
    arr.forEach(id => {
        const lastChar = url.charAt(url.length - 1);
        url += addAmpersandOrNot(lastChar);
        url += `${queryKey}=${id}`;
    });

    return url;
};

export const prepareUrlQueryPart = (queriesObj: QueriesObj) => {
    let url = '';

    const queryArr = Object.values(queriesObj);

    if (queryArr?.length !== 0) {
        url = '?';
        const queryEntries = Object.entries(queriesObj);

        for (let el of queryEntries) {
            if (Array.isArray(el[1])) {
                url += fillStr(url, el[1], el[0]);
            } else {
                url += addAmpersandOrNot(url);
                url += `${el[0]}=${el[1]}`;
            }
        }
    }

    return url;
};
