<script>
  import { onMount } from "svelte";
  import Layout from "src/routes/Layout.svelte";
  import LessonsList from "./LessonsList.svelte";
  import Nav from "components/Nav.svelte";
  import Button from "components/UI/Button.svelte";
  import Select from "components/UI/Select.svelte";
  import { logOut } from "src/actions/loginAction.js";
  import { getAllUsers, getUserLessons } from "src/actions/userAction.js";
  import { activeLessons, completedLessons, isLessonsStoreEmpty } from "src/stores/lessonsStore.js";
  import { userStore } from "src/stores/userStore.js"; 
  export let params = {};
 
  onMount(() => {
    if ($userStore.role === "student" && isLessonsStoreEmpty()) {
      getUserLessons($userStore.login);
    }
  });

  // teacher feature
  const users = $userStore.role === "teacher" ? getAllUsers() : [];

  function updateLessons(){
    getUserLessons($userStore.login);
  };

  function selectUser({ detail }){
    let selectedUser = detail.selected;
    getUserLessons(selectedUser);
  }
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
      {#await users then data}     
        <Select 
          placeholder="Select student" 
          options={data} 
          selected={$activeLessons.user}
          on:select={selectUser}/>
      {/await}   
    {/if} 
    <LessonsList
      on:update={updateLessons}
      params={params.lesson} 
      completed={$completedLessons[params.lesson]} 
      active={$activeLessons[params.lesson]}     
    />    
  </div>
</Layout>