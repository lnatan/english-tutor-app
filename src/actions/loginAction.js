import { setCookie, getCookie, deleteCookie } from "src/utils/cookie";
import { userStore } from "src/stores/index.js"
import { getUser } from "src/actions/userAction.js";
import { push } from "svelte-spa-router"; 

const setUserLogged = () => setCookie("user", 1);
const deleteUserLogged = () => deleteCookie("user");
const isUserLogged = () => getCookie("user");

async function logIn(login, password){
  const userData = await getUser(login);

  if (userData.password !== password) {
    throw new Error("Password not correct");
  }

  userStore.set({
    name: userData.name,
    login: userData.login,
    role: userData.role
  });
  setUserLogged();
  
  return userData;
};

function logOut(){
  deleteUserLogged();
  push("/");
};

export { 
  isUserLogged,
  logIn,
  logOut
};