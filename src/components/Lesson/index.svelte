<script>
  import Layout from "src/routes/_layout.svelte";
  import Nav from  "components/Nav.svelte";
  import { link, push } from 'svelte-spa-router'; 
  import active from 'svelte-spa-router/active';
  import { userName, userLogin } from "src/store/userStore.js";
  export let params = {};

  const links = ["lesson", "hometask"];

  const slug = (title) => title.toLowerCase().replace(/\s/g, "-");

  // const URL = "./data/journal.json";
  // const journal = getJournal();
  
 	// async function getJournal(){
  //   try {
  //     const res = await fetch(URL);
  //     const data = await res.json();
  //     return data;
  //   } catch(err) {   
  //     throw new Error(err);
  //   }
  // }

   if (!$userLogin) {
    push("/");
  }

  const URL = `./data/users/${$userLogin}.json`;
  const userData = getUserData();  
 	async function getUserData(){
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
    <div class="flex items-center text-lg leading-loose pb-4 px-2">
      <span class="icon pr-2">
        <i class="icon-girl" />
      </span>
      Welcome, {$userName}!</div>
    <nav>
      <ul>
        {#each links as item}
          <li>
            <a href="/{item}" use:link use:active>
              <span class="icon pr-2">
                <i class="icon-{item}" />
              </span>
              {item}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
  <div slot="main">
    <h2 class="title pb-4">Active</h2>
    {#await userData then data}
    <div class="rounded border bg-white p-6">
      <ul>
        {#each data.hometask as item}
          <button on:click={() => push(`/${params.lesson}/${slug(item.plan)}`)}>{item.plan}</button>
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