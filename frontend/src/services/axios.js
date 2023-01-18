import axios from "axios";

// const baseURL = "http://localhost:8000/api/v1/";

// const axiosInstance = axios.create({
//   baseURL,
// });

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
