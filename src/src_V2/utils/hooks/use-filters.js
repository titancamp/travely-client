import { useCallback, useEffect, useState } from 'react';

import { setQueryParams, useQueryParamsFromUrl } from '../../utils';

const useFilters = (defaultFilters, allowQueryOnUrl) => {
  const queryParamsFromUrl = useQueryParamsFromUrl();

  const [filters, setFilters] = useState({
    ...defaultFilters,
    ...queryParamsFromUrl,
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
