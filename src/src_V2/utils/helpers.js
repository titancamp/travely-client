import { useSearchParams } from "react-router-dom";

export const generateDate = (dateStr) => {
  if (!dateStr) return '';

  const date = new Date(dateStr);

  let dd = String(date.getDate()).padStart(2, '0');
  let mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
  let yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const generateArrayByRange = (start, end, conditionCallback = () => true) => {
  if (start > end) {
    return [];
  }
  return [...Array(end - start + 1).keys()]
    .map((_, index) => start + index)
    .filter(conditionCallback);
};

export const useQueryParamsFromUrl = () => {
    const [urlParams] = useSearchParams();
    const data = {};

    for (let key of urlParams.keys())  {
        if (urlParams.getAll(key).length > 1) {
            data[key] = urlParams.getAll(key);
        } else {
            data[key] = urlParams.get(key);
        }
    }
    return data;
};

export const setQueryParams = (query) => {
    const queryString = `?${Object.entries(query).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join('&')}`;
    window.history.replaceState(null, null, queryString);
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
