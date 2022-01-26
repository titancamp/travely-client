import axios from 'axios';
import CacheService from './storage';

//TODO temporary refreshToken needs to be imported.
// import refreshToken from './somewhere';
function refreshToken() {}

const baseConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosInstance = axios.create(baseConfig);

let subscribers = [];
let isRefreshing = false;

function requestInterceptionHandler(config) {
  const accessToken = CacheService.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}

async function responseFailureInterceptionHandler(error) {
  if (!error.response || error.response.status === 500) {
    //TODO handle redirection to IntervalServer page correctly
    return history.push && history.push('/INTERNAL_SERVER_PAGE');
  }

  const originalConfig = error.config;

  //TODO check the expiration case correctly.
  if (error.response.status === 401 && originalConfig.url !== 'url of auth-> sigin') {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshToken().then((res) => {
          const { accessToken, refreshToken } = res.data;
          subscribers.map((cb) => cb(accessToken));
          CacheService.setItem('accessToken', accessToken);
          CacheService.setItem('refreshToken', refreshToken);
          subscribers = [];
          isRefreshing = false;
        });
      }

      return new Promise((resolve) => {
        subscribers.push((token) => {
          originalConfig.headers.Authorization = `Bearer ${token}`;
          resolve(axios(originalConfig));
        });
      });
    } catch (_error) {
      return Promise.reject(_error);
    }
  }

  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(requestInterceptionHandler, (error) =>
  Promise.reject(error)
);

axiosInstance.interceptors.response.use((res) => res, responseFailureInterceptionHandler);

export default axiosInstance;
