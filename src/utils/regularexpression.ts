export const escapeRegularExpression = (stringToGoIntoTheRegex: string) => {
  return stringToGoIntoTheRegex.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
};
