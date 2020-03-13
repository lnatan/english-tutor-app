<script>
  import Router from "svelte-spa-router"; 
  import Login from "src/routes/Login.svelte";
  import routes from "./routes.js";
  import { isUserLogged } from "src/actions/loginAction.js";
  import { push } from 'svelte-spa-router';

  function checkAutorization(){
    const isLogin = isUserLogged();
    if (!isLogin) {
      push("/");
    }
  };
</script>


<Router {routes} on:routeLoaded={checkAutorization}/>