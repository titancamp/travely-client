import { useMemo } from 'react';

const isColumnVisible = (visibleColumns, key) =>
  Object.prototype.hasOwnProperty.call(visibleColumns, key) && visibleColumns[key];

const useTableDataGenerator = (tableDataNormalizer, deps, visibleColumns) => {
  return useMemo(() => {
    console.log(deps);
    const data = tableDataNormalizer(...deps);
    let { head, rows } = data;

    if (visibleColumns) {
      head = head.filter(({ key }) => isColumnVisible(visibleColumns, key));
      rows = rows.map(({ columns, ...rest }) => ({
        ...rest,
        columns: columns.filter(({ key }) => isColumnVisible(visibleColumns, key)),
      }));
    }
    return {
      head,
      rows,
    };
  }, [...deps, visibleColumns]);
};

export default useTableDataGenerator;
