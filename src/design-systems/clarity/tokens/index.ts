import colors from './colors';
import radius from './radius';
import spacing from './spacing';
import fontFamily from './fontFamily';
import fontSize from './fontSize';
import fontWeight from './fontWeight';
import lineHeight from './lineHeight';
import letterSpacing from './letterSpacing';
import shadows from './shadows';
import zIndex from './zIndex';
import duration from './duration';
import easing from './easing';
import borderWidth from './borderWidth';
import opacity from './opacity';
import size from './size';
import breakpoints from './breakpoints';
import blur from './blur';
import outlineOffset from './outlineOffset';
import strokeWidth from './strokeWidth';
import aspectRatio from './aspectRatio';
import elevation from './elevation';
import focus from './focus';
import grid from './grid';
import transition from './transition';

const tokens = {
    colors,
    radius,
    spacing,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    shadows,
    zIndex,
    duration,
    easing,
    borderWidth,
    opacity,
    size,
    breakpoints,
    blur,
    outlineOffset,
    strokeWidth,
    aspectRatio,
    elevation,
    focus,
    grid,
    transition
} as const;

export default tokens;
