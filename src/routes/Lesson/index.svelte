<script>
  import Layout from "src/routes/_layout.svelte";
  import Nav from  "components/Nav.svelte";
  import { link, push } from 'svelte-spa-router'; 
  export let params = {};

  const links = [
    ["/Lesson", "Lesson"],
    ["/Hometask", "Hometask"]
  ];
  // Get the tests (done/undone, by users)
  const tests = ["the-moons-of-jupiter", "the-jupiters-of-moon"];
</script>

<Layout>
  <div slot="sidebar">
    <div class="mb-6">Welcome, {params.name ? params.name : "Xiao"}!</div>
    <Nav links={links} />
  </div>
  <div slot="main">
    <h2 class="title">{params.lesson}</h2>
    <div class="tasks_active">
      {#each tests as test}
        <button on:click={() => push(`/${params.lesson}/${test}`)}>{test}</button>
        <br/>
      {/each}
    </div>
    <h2 class="title">Completed</h2>
    <div class="tasks_comleted">
      Here done cards
    </div>
  </div>
</Layout>