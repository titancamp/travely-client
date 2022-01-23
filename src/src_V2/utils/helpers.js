export const generateDate = (dateStr) => {
  if (!dateStr) return '';

  const date = new Date(dateStr);

  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
  let yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const moneyMask = (value = 0) => {
  // WARNING - floating point number fractional part rounding if fraction is more than maximumFractionDigits
  return value.toLocaleString('fullwide', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });
};

export const generateArrayByRange = (start, end, conditionCallback = () => true) => {
  if (start > end) {
    return [];
  }
  return [...Array(end - start + 1).keys()]
    .map((_, index) => start + index)
    .filter(conditionCallback);
};

export const noop = () => {};

export const createTableColumn = (key, content, defaultContent, columnStyles) => ({
  key,
  content,
  defaultContent,
  columnStyles,
});

export const createTableRow = (key, columns, data) => ({
  key,
  columns,
  data,
});
