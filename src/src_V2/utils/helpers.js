export const generateDate = (date) => date;

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

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}
