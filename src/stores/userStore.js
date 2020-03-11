// import { writable } from "svelte/store";
import { writable, get } from "svelte-persistent-store/local";
import { setCookie, getCookie, deleteCookie } from "src/utils/cookie"

const setUserAuthorized = () => {
  setCookie("user", 1);
};

const deleteUserAuthorized = () => {
  deleteCookie("user");
};

const isUserAuthorized = () => {
  return getCookie("user");
};

const userStore = writable("app-user",{});

const getUserStore = (key) => {
  const jsonUserStore = JSON.parse(get(userStore));

  if (key === undefined) {
    return jsonUserStore;
  }

  if (jsonUserStore[key] !== undefined) {
    return jsonUserStore[key];   
  } 
}

export { 
  userStore, 
  getUserStore, 
  setUserAuthorized, 
  deleteUserAuthorized, 
  isUserAuthorized 
};