export const toTitleCase = (value = '') => {
    if (!value) return '';
    return value
        .toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
};
