import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../api/axiosInstance';
import { useAuthContext } from './useAuthContext';
export const useAxios = () => {
  const { auth, setAuth } = useAuthContext();
  const refreshTokenRef = useRef(auth?.refreshToken);
  const navigate = useNavigate();
  useEffect(() => {
    const requestIntercept = instance.interceptors.request.use(
      (config) => {
        console.log('intercepting request ...');
        const accessToken = auth?.accessToken;
        if (accessToken) {
          config.headers.Authorization = 'Bearer ' + accessToken;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseIntercept = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error, 'intercepted error');
        const originalRequest = error.config;
        // In case the request is failed again, and the server continue to return 401 status code, it may go to Infinite loop.
        // So We use a flag call _retry on original Request (config). _retry is set to true right after the first time we meet 401 status.
        if (
          !originalRequest?._retry &&
          (error?.response?.status === 403 || error?.response?.status === 401)
        ) {
          originalRequest._retry = true;
          try {
            const refreshToken = refreshTokenRef.current;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URI}/auth/refresh-token`,
              { refreshToken }
            );
            console.log('ad yo yo yoy o', response);

            const { accessToken } = response.data;
            originalRequest.headers.Authorization = 'Bearer ' + accessToken;
            console.log(
              `New Token: ${accessToken}, refresh token: ${refreshToken}`
            );
            setAuth((prevAuth) => ({ ...prevAuth, accessToken }));
            return axios(originalRequest);
          } catch (error) {
            if (
              error?.response?.data?.error === 'jwt expired' ||
              error?.response?.data?.error === 'invalid algorithm' ||
              error?.response?.data?.error === 'invalid signature'
            ) {
              localStorage.clear();
              navigate('/login');
            }
            console.error(error?.response, 'xsafs');
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      instance.interceptors.request.eject(requestIntercept);
      instance.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.accessToken, setAuth, navigate]);

  return { api: instance };
};
