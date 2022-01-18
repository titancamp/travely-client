import { useCallback, useEffect, useState } from 'react';
import { getQueryParamsFromUrl, setQueryParams } from '../utils';

const useFilters = (defaultFilters, allowQueryOnUrl) => {
  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...getQueryParamsFromUrl(),
  });

  const handleFiltersChange = useCallback((data, replaceFilters) => {
    if (replaceFilters) {
      setFilters(data);
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...data,
      }));
    }
  }, []);

  useEffect(() => {
    if (allowQueryOnUrl) {
      setQueryParams(filters);
    }
  }, [filters]);

  return {
    filters,
    handleFiltersChange,
  };
};

export default useFilters;
