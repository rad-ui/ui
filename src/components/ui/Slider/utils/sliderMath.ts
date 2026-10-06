const countDecimals = (value: number): number => {
    if (!Number.isFinite(value)) return 0;
    const text = String(value);
    const exponentMatch = /e-(\d+)$/i.exec(text);
    if (exponentMatch) {
        const mantissaDecimals = (text.split(/e/i)[0].split('.')[1] || '').length;
        return mantissaDecimals + Number(exponentMatch[1]);
    }
    return (text.split('.')[1] || '').length;
};

/** Rounds away floating point noise (e.g. 0.1 + 0.2) to the precision of step/min. */
export const roundToStepPrecision = (value: number, step: number, min: number): number => {
    const decimals = Math.min(Math.max(countDecimals(step), countDecimals(min)), 15);
    return Number(value.toFixed(decimals));
};

/** Snaps a raw value to the nearest step measured from `min`, then rounds float noise. */
export const snapToStep = (value: number, step: number, min: number): number => {
    if (!(step > 0)) return value;
    const snapped = Math.round((value - min) / step) * step + min;
    return roundToStepPrecision(snapped, step, min);
};

export const clampValue = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/**
 * Bounds for the thumb at `index` in a multi-thumb slider so it cannot cross
 * its neighbours.
 */
export const getThumbBounds = (values: number[], index: number, min: number, max: number) => ({
    lower: index > 0 ? values[index - 1] : min,
    upper: index < values.length - 1 ? values[index + 1] : max
});
