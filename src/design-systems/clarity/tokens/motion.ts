const motion = {
    duration: {
        fast: '120ms',
        normal: '180ms',
        slow: '240ms'
    },
    easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1.2)'
    }
} as const;

export default motion;
