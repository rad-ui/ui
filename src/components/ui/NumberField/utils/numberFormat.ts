const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const formatNumber = (value: number | '', locale: string | undefined, format: Intl.NumberFormatOptions) =>
    value === '' ? '' : new Intl.NumberFormat(locale, format).format(value);

/**
 * Reads a number typed in the field's format: group separators, currency,
 * percent and unit text are ignored, and the locale's decimal separator is
 * understood. Returns '' for empty input and null while it isn't a number yet.
 */
export const parseFormattedNumber = (text: string, locale: string | undefined, format: Intl.NumberFormatOptions): number | '' | null => {
    const trimmed = text.trim();
    if (trimmed === '') return '';
    const parts = new Intl.NumberFormat(locale, format).formatToParts(-12345.6);
    const group = parts.find((part) => part.type === 'group')?.value;
    const decimal = parts.find((part) => part.type === 'decimal')?.value ?? '.';
    let normalized = trimmed;
    if (group) normalized = normalized.replace(new RegExp(escapeRegExp(group), 'g'), '');
    // Some locales group with a narrow no-break space; plain spaces are typed too.
    normalized = normalized.replace(/[\s  ]/g, '');
    normalized = normalized.replace(new RegExp(escapeRegExp(decimal), 'g'), '.');
    const isNegative = /^-|−|\(/.test(normalized);
    normalized = normalized.replace(/[^0-9.]/g, '');
    if (normalized === '' || normalized === '.') return null;
    let number = Number(normalized);
    if (!Number.isFinite(number)) return null;
    if (isNegative) number = -number;
    if (format.style === 'percent') number = number / 100;
    return number;
};
