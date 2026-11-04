export type FilterOptions = {
    /** Locale for case folding, such as `'tr'`. Defaults to the runtime's locale. */
    locale?: Intl.LocalesArgument;
    /** Ignore accents, so "cafe" matches "Café". Defaults to true. */
    ignoreAccents?: boolean;
};

export type Filter = {
    contains: (text: string, query: string) => boolean;
    startsWith: (text: string, query: string) => boolean;
    endsWith: (text: string, query: string) => boolean;
};

const ACCENTS = /[̀-ͯ]/g;

/** Text matchers for filtering lists: case-insensitive, accent-insensitive by default, locale aware. */
export const createFilter = ({ locale, ignoreAccents = true }: FilterOptions = {}): Filter => {
    const fold = (value: string) => {
        const lowered = value.toLocaleLowerCase(locale as string | string[] | undefined);
        return ignoreAccents ? lowered.normalize('NFD').replace(ACCENTS, '') : lowered;
    };
    return {
        contains: (text, query) => fold(text).includes(fold(query)),
        startsWith: (text, query) => fold(text).startsWith(fold(query)),
        endsWith: (text, query) => fold(text).endsWith(fold(query))
    };
};
