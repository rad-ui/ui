const easing = {
    entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1.2)',
    linear: 'linear',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
} as const;

export default easing;
