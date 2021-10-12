export const escapeRegularExpression = (stringToGoIntoTheRegex) => {
    return stringToGoIntoTheRegex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

