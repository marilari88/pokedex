export const capitalize = (str: string) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
};

export const leftPad = (number: number, digits: number): string => {
  let numberStr = number.toString();
  if (numberStr.length < digits) {
    let leftDigits = digits - numberStr.length;
    while (leftDigits > 0) {
      numberStr = "0" + numberStr;
      leftDigits--;
    }
  }
  return numberStr;
};
