export const escapeRegularExpression = (stringToGoIntoTheRegex) => {
  return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};
