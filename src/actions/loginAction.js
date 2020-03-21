import { setCookie, getCookie, deleteCookie } from "src/utils/cookie";
import { updateUserStore } from "src/stores/userStore.js";
import { deleteLocalStorage } from "src/utils/persistStore.js"
import { getUser } from "src/actions/userAction.js";
import { push } from "svelte-spa-router"; 

const isUserLogged = () => getCookie("user");

async function logIn(login, password){
  const userData = await getUser(login);

  if (userData.password !== password) {
    throw new Error("Password not correct");
  }

  updateUserStore({
    name: userData.name,
    login: userData.login,
    role: userData.role
  });
  
  setCookie("user", 1); 
}

function logOut(){ 
  deleteLocalStorage();
  deleteCookie("user");   
  push("/");
}

export { 
  isUserLogged,
  logIn,
  logOut
};