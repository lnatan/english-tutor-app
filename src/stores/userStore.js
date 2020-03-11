import { writable } from "svelte/store";
import { setCookie, getCookie, deleteCookie } from "src/utils/cookie";

const setUserAuthorized = () => {
  setCookie("user", 1);
};

const deleteUserAuthorized = () => {
  deleteCookie("user");
};

const isUserAuthorized = () => {
  return getCookie("user");
};

const createPersistStore = (name, value) => {
  const store = localStorage.getItem(name);
  value = writable(!store ? value : JSON.parse(store));
  value.subscribe(value => {
    if (value !== undefined) {
      localStorage.setItem(name, JSON.stringify(value));
    }
  })
  return value;
}

const userStore = createPersistStore("app-user",{});

export { 
  userStore,
  setUserAuthorized, 
  deleteUserAuthorized, 
  isUserAuthorized 
};