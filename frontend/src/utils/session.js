import instance from "../services/axios";

export const setSession = (accessToken, refreshToken = null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete instance.defaults.headers.common["Authorization"];
  }
  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
};

export const resetSession = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  delete instance.defaults.headers.common["Authorization"];
};
