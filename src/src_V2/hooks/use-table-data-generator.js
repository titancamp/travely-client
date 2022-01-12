import {useMemo} from 'react';

// eslint-disable-next-line no-prototype-builtins
const isColumnVisible = (visibleColumns, key) => visibleColumns.hasOwnProperty(key) && visibleColumns[key];

const useTableDataGenerator = (tableDataNormalizer, deps, visibleColumns) => {
    return useMemo(() => {
        const data = tableDataNormalizer(...deps);
        let {
            head,
            rows
        } = data;

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
