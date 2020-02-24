<script>
  import Layout from "../_layout.svelte";
  import {link, push, pop, replace, location, querystring} from 'svelte-spa-router'; 
</script>

<Layout> 
    <div class="container border bg-white">
      
    </div>
  <h1>Choose the test:</h1>
  <ul>
    <li><a href="/reading/the-moons-of-jupiter" use:link>The Moons of Jupiter</a></li>   
  </ul>
</Layout>