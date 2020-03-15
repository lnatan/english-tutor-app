<script>
  import { onMount } from "svelte";
  import Layout from "src/routes/Layout.svelte";
  import LessonsList from "./LessonsList.svelte";
  import Nav from "components/Nav.svelte";
  import Button from "components/UI/Button.svelte";
  import Select from "components/UI/Select.svelte";
  import { logOut } from "src/actions/loginAction.js";
  import { getAllUsers, setUserActiveLessons, setUserCompletedLessons } from "src/actions/userAction.js";
  import { activeLessons, completedLessons } from "src/stores/lessonsStore.js";
  import {  userStore } from "src/stores/userStore.js"; 
  export let params = {};
 
  onMount(() => {
    if ($userStore.role === "student") {
      setUserActiveLessons($userStore.login);
      //setUserCompletedLessons($userStore.login);
    }
  });

  // teacher feature
  const users = $userStore.role === "teacher" ? getAllUsers() : [];

  function selectUser({ detail }){
    let selectedUser = detail.selected;
    setUserActiveLessons(selectedUser);
    //setUserCompletedLessons(selectedUser);
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
    <LessonsList title="Active" lessons={$activeLessons[params.lesson]} params={params.lesson} />
    <LessonsList title="Completed" lessons={completedLessons} params={params.lesson} />
  </div>
</Layout>