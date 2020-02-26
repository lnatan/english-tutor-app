<script>
  import Layout from "src/routes/_layout.svelte";
  import Nav from  "components/Nav.svelte";
  import { activities } from "src/config.js";
  import { link, push } from 'svelte-spa-router'; 
  export let params = {};

  // Get the lessons (done/undone, by users)
  const lessons = ["the-moons-of-jupiter", "the-jupiters-of-moon"];
</script>

<Layout>
  <div slot="sidebar">
    <div class="mb-6">Welcome, {params.name ? params.name : "Xiao"}!</div>
    <Nav links={activities} />
  </div>
  <div slot="main">
    <h2 class="title">{params.activities}</h2>
    <div class="tasks_active">
      {#each lessons as l}
        <button on:click={() => push(`/${params.activities}/${l}`)}>{l}</button>
        <br/>
      {/each}
    </div>
    <h2 class="title">Completed</h2>
    <div class="tasks_comleted">Here done cards    
      <a href="/{params.activities}/{lessons}" class="underline" use:link>The Moons of Jupiter</a>
    </div>
  </div>
</Layout>