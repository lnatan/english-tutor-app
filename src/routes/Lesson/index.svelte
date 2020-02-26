<script>
  import Layout from "../_layout.svelte";
  import Nav from  "../../components/Nav.svelte";
  //import { links } from "../../config.js";
  import { link, push, pop, replace, location, querystring } from 'svelte-spa-router'; 
  export let params = {};
</script>

<Layout> 
  <div slot="sidebar">
    <div class="mb-6">Welcome, {params.name ? params.name : "Xiao"}!</div>
    <!-- <Nav {links} /> -->
  </div>
  <div slot="main" class="container border bg-white p-8">
    <h1 class="title">Lessons</h1>
    <ul>
      <li><a href="/lesson/the-moons-of-jupiter" class="underline" use:link>The Moons of Jupiter</a></li>   
    </ul>
  </div>  
</Layout>