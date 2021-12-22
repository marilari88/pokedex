export const capitalize = (str: string) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

export const leftPad = (number: number, digits: number) => {
  return number.toString().padStart(digits, "0");
};
