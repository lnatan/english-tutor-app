import { writable } from "svelte/store";
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

const createUserStore = (key, startValue) => {
  const { subscribe, set } = writable(startValue);
  
	return {
    subscribe,
    set,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }
      
      subscribe(current => {
        localStorage.setItem(key, JSON.stringify(current));
      });
    }
  };
}

const userStore = createUserStore("app-user",{});

export { userStore, setUserAuthorized, deleteUserAuthorized, isUserAuthorized };