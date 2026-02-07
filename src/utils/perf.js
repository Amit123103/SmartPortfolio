export const getTier = () => {
    // Simple tier detection based on hardware concurrency or user agent
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = /Android|iPhone/i.test(navigator.userAgent);

    if (isMobile || cores <= 4) return 'low';
    return 'high';
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};
