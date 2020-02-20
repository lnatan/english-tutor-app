<script>
  import Nav from "./components/Nav.svelte";
  import Router from 'svelte-spa-router'; 
  import {link, push, pop, replace, location, querystring} from 'svelte-spa-router'; 
  import active from 'svelte-spa-router/active';
  import routes from './routes';
</script>

<main>
  <Nav/>
  <div class="container">
    <div class="border p-4 mt-6">
      <!-- Show the current path -->
      <p>
        Current path: <code id="currentpath">{$location}</code>
        <br/>
        Querystring: <code id="currentqs">{$querystring}</code>
      </p>
    </div>
    <div class="container border p-4 mt-6">
      <Router {routes}/>
    </div>
  </div>
</main>
