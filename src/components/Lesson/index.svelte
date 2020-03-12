<script>
  import Layout from "src/routes/Layout.svelte";
  import LessonsList from "./LessonsList.svelte";
  import Nav from "components/Nav.svelte";
  import Button from "components/UI/Button.svelte";
  import Select from "components/UI/Select.svelte";
  import active from "svelte-spa-router/active";  
  import { link, push } from "svelte-spa-router"; 
  import { userStore, deleteUserAuthorized } from "src/stores/userStore.js";
  export let params = {};

  $: activeLessons = $userStore[params.lesson] || getUserActiveLessons(selectedUser, params.lesson) || [];
  const completedLessons = []; // fetch
  
  // teachers feature
  const URL = "./data/journal.json";
  const journal = getJournal();
  let selectedUser;
  
 	async function getJournal(){
    try {
      const res = await fetch(URL);
      const data = await res.json();
      return data;
    } catch(err) {   
      throw new Error(err);
    }
  }

  function selectUser({ detail }){
    selectedUser = detail.selected;
    // getUserActiveLessons(selectedUser, params.lesson);
  }

  function getUserActiveLessons(user, lesson){
    if (user === undefined) {
      return;
    }
    const URL = `./data/users/${user}.json`;
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`User '${user}' not found`);
        } else {
          return res.json();
        }
      })
      .then(userData => {
        activeLessons = userData[lesson];
      })
      .catch(error => console.log(error));   
  };

  function logOut(){
    deleteUserAuthorized();
    push("/");
  };
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
          <span class="icon">
            <i class="icon-logout" />
          </span>
        </Button>
      </span>      
      </div>
    <Nav links={["lesson", "hometask"]} icon={true}/>
  </div>
  <div slot="main">
    {#if $userStore.role === "teacher"}
      {#await journal then data}
        <Select options={data.users} on:select={selectUser}/>
      {/await}   
    {/if} 
    <LessonsList title="Active" lessons={activeLessons} params={params.lesson} />
    <LessonsList title="Completed" lessons={completedLessons} params={params.lesson} />
  </div>
</Layout>