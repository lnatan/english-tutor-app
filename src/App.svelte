<script>
  import Router from 'svelte-spa-router'; 
  import routes from './routes';
  import { push } from 'svelte-spa-router'; 
  import { userLogin } from "src/store/userStore.js";

  if (!$userLogin) {
    push("/");
  }

</script>

<Router {routes}/>