import useStore from "@/store";
import { message } from "antd";
import axios from "axios";
import NProgress from 'nprogress';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 3000
});

axiosInstance.interceptors.request.use(config => {
  const { userInfo } = useStore.getState()
  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  NProgress.start();
  return config;
});

axiosInstance.interceptors.response.use(
  res => {
    const { userInfo } = useStore.getState()
    const newToken = res.headers['token'];

    if (newToken) {
      useStore.getState().updateUserInfo({
        ...userInfo,
        token: newToken,
      })
    }
    NProgress.done();
    return res;
  },
  error => {
    const { data } = error.response;
    message.error(data.message);
    if (data.statusCode === 401) {
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    }
    NProgress.done();
    return Promise.reject(error);
  }
);

export { axiosInstance };