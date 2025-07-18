import axios from "axios";
import NProgress from 'nprogress';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 3000
});

axiosInstance.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

axiosInstance.interceptors.response.use(
  res => {
    NProgress.done();
    return res;
  },
  err => {
    NProgress.done();
    return Promise.reject(err);
  }
);

export { axiosInstance };