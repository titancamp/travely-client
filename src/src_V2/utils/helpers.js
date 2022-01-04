export const generateDate = (dateStr) => {
  const date = new Date(dateStr);

  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
  let yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
};

export const generateArrayByRange = (start, end, conditionCallback = () => true) => {
  if (start > end) {
    return [];
  }
  return [...Array(end - start + 1).keys()]
    .map((_, index) => start + index)
    .filter(conditionCallback);
};
