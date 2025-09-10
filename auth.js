export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");
export const getRole = () => JSON.parse(atob(getToken().split(".")[1]))?.role;
