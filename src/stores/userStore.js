import { writable } from "svelte/store";
// import { writable, get } from "svelte-persistent-store/local";
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

// const getUserStore = (key) => {
//   console.log(get(userStore));
//   const store = get(userStore);
//   // const json = JSON.parse();
//   if (key === undefined) {
//     return store;
//   }

//   if (store[key] !== undefined) {
//     return store[key];   
//   } 
// }

export { 
  userStore,
  setUserAuthorized, 
  deleteUserAuthorized, 
  isUserAuthorized 
};