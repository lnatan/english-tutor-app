import { setCookie, getCookie, deleteCookie } from "src/utils/cookie";
import { push } from "svelte-spa-router"; 

const setUserAuthorized = () => {
  setCookie("user", 1);
};

const deleteUserAuthorized = () => {
  deleteCookie("user");
};

const isUserAuthorized = () => {
  return getCookie("user");
};

const logOut = () => {
  deleteUserAuthorized();
  push("/");
};

export { 
  setUserAuthorized, 
  isUserAuthorized,
  logOut
};