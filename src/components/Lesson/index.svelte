<script>
  import Layout from "src/routes/Layout.svelte";
  import Button from "components/UI/Button.svelte";
  import active from 'svelte-spa-router/active';  
  import { link, push } from 'svelte-spa-router'; 
  import { userStore, deleteUserAuthorized } from "src/stores/userStore.js";
  export let params = {};

  userStore.useLocalStorage();

  const links = ["lesson", "hometask"];
  const slug = (title) => title.toLowerCase().replace(/\s/g, "-");

  function logOut(){
    deleteUserAuthorized();
    push("/");
  };

  // const URL = `./data/users/${$userStore.login}.json`;
  // const userData = getUserData();  
 	// async function getUserData(){
  //   try {
  //     const res = await fetch(URL);
  //     const data = await res.json();
  //     return data;
  //   } catch(err) {   
  //     throw new Error(err);
  //   }
  // }
</script>

<Layout>
  <div slot="sidebar">
    <div class="flex items-center text-lg leading-loose pb-4 px-2">
      <span class="icon pr-2">
        <i class="icon-girl" />
      </span>
      Welcome, {$userStore.name}!
      <span class="ml-auto">
        <Button type="link" on:click={logOut}>
          <span class="icon ">
            <i class="icon-logout" />
          </span>
        </Button>
      </span>      
      </div>
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
    <!-- {#await userData then data} -->
    <div class="rounded border bg-white p-6">
      <ul>
        {#each $userStore[params.lesson] as item}
          <button on:click={push(`/${params.lesson}/${slug(item.title)}`)}>{item.title}</button>
          <br/>
        {/each}
      </ul>
    </div>
    <!-- {:catch error}
      <!-- promise was rejected -->
      <!-- {error}
    {/await}  -->
    <!-- <h2 class="title">Completed</h2>
    <div class="tasks_comleted">
      Here done cards
    </div> -->
  </div>
</Layout>