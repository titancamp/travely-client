export const generateDate = (date) => date;

export const getQueryParamsFromUrl = (url = window.location.search) => {
    const urlParams = new URLSearchParams(url);
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
