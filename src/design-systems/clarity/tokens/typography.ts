import fontFamily from './fontFamily';
import fontSize from './fontSize';
import fontWeight from './fontWeight';
import lineHeight from './lineHeight';
import letterSpacing from './letterSpacing';

const typography = {
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
    letterSpacing
} as const;

export default typography;
