export function match(keyword: string, word: string): boolean {
    const regexp = new RegExp(
        '(.)*' +
            keyword
                .toLowerCase()
                .split('')
                .filter((char) => char.trim() !== '')
                .join('(.)*')
    );

    return regexp.test(word.toLowerCase()) ? true : false;
}
