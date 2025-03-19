const getFirstLetters = (str: string): string => {
  return str
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
};

export default getFirstLetters;
