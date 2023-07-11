export const decodeUriSafely = (uri: string): string => {
    try {
        const decodedString = decodeURI(uri);
        return decodedString;
    } catch (error) {
        return 'DECODE_URI_ERROR';
    }
};
