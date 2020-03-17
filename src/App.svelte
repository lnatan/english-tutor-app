<script>
  import Router from "svelte-spa-router"; 
  import Login from "src/routes/Login.svelte";
  import routes from "./routes.js";
  import { isUserLogged } from "src/actions/loginAction.js";
  import { push } from 'svelte-spa-router';

  function checkUser(){
    if (!isUserLogged()) {
      push("/");
    }
  };
</script>


<Router {routes} on:routeLoaded={checkUser}/>