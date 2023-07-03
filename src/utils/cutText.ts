function cutText(text: string) {
    if (text.length > 50) {
        return text.slice(0, 20);
    } else return text;
}

export default cutText;
