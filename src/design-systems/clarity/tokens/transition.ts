import duration from './duration';
import easing from './easing';

const transition = {
    fast: `background-color ${duration.fast} ${easing.standard}, color ${duration.fast} ${easing.standard}, border-color ${duration.fast} ${easing.standard}`,
    normal: `background-color ${duration.normal} ${easing.standard}, color ${duration.normal} ${easing.standard}, box-shadow ${duration.normal} ${easing.standard}, transform ${duration.normal} ${easing.standard}`,
    slow: `transform ${duration.slow} ${easing.emphasized}, opacity ${duration.slow} ${easing.standard}, box-shadow ${duration.slow} ${easing.standard}`
} as const;

export default transition;
