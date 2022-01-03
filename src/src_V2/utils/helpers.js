export const generateDate = (dateStr) => {
  const date = new Date(dateStr);

  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
  let yyyy = date.getFullYear();

  return `${mm}/${dd}/${yyyy}`;
};
