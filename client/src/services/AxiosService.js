import axios from 'axios';

const http = axios.create({
  withCredentials: true,
});

http.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;
  return config;
});

http.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const response = await axios
          .create({
            withCredentials: true,
          })
          .post('api/auth/refresh');
        localStorage.setItem('accessToken', response.data.accessToken);
        return http.request(originalRequest);
      } catch (error) {
        return;
      }
    }
    throw error;
  }
);

export default http;
