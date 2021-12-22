export const escapeRegularExpression = (stringToGoIntoTheRegex: string): string => {
    return stringToGoIntoTheRegex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

