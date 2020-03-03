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
  // const tests = ["the-moons-of-jupiter", "the-jupiters-of-moon"];

  const slug = (title) => {
    return title
      .toLowerCase()
      .replace(/\s/g, "-");   
  };

  const URL = `./data/journal.json`;
  const promise = getTestsList();
  
 	async function getTestsList(){
    try {
      const res = await fetch(URL);
      const data = await res.json();
      return data;
    } catch(err) {   
      throw new Error(err);
    }
  }
</script>

<Layout>
  <div slot="sidebar">
    <div class="mb-6">Welcome, {params.name ? params.name : "Xiao"}!</div>
    <Nav links={links} />
  </div>
  <div slot="main">
    <h2 class="title">{params.lesson}</h2>
    {#await promise then journal}
    <div class="rounded border bg-white p-6">
      <ul>
        {#each journal.alltests as item}
          <button on:click={() => push(`/${params.lesson}/${slug(item)}`)}>{item}</button>
          <br/>
        {/each}
      </ul>
    </div>
    {:catch error}
      <!-- promise was rejected -->
      Error
    {/await}
    <!-- <h2 class="title">Completed</h2>
    <div class="tasks_comleted">
      Here done cards
    </div> -->
  </div>
</Layout>