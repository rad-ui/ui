import colors from './colors';
import radius from './radius';
import spacing from './spacing';
import typography from './typography';
import shadows from './shadows';
import zIndex from './zIndex';
import motion from './motion';
import borderWidth from './borderWidth';
import opacity from './opacity';

const tokens = {
    colors,
    radius,
    spacing,
    typography,
    shadows,
    zIndex,
    motion,
    borderWidth,
    opacity
} as const;

export default tokens;
