<script>
  import Button from "components/UI/Button.svelte";
  import { push } from 'svelte-spa-router';
  import { fade } from "svelte/transition";
  import { userStore, setUserAuthorized } from "src/stores/userStore.js";

  let login = "";
  let password = "";
  let message = "";
  let errorLogin = false;
  let errorPassword = false;

  function checkUser(e){
    e.preventDefault();    

    login = login.trim();
    password = password.trim();

    errorLogin = !login.length;
    errorPassword = !password.length;
  
    if (errorLogin || errorPassword) {
     return;
    }

    const URL = `/data/users/${login}.json`;

    fetch(URL)
      .then(res => {
        if (!res.ok) {
          errorLogin = true;
          throw new Error(`User '${login}' not found`);
        } else {
          return res.json();
        }
      })
      .then(userData => {
        if (userData.password === password) {   
          userStore.set({            
            login: login,
            name: userData.name,
            role: userData.role,
            hometask: userData.hometask,
            lesson: userData.lesson,
          });
          // userStore.useLocalStorage();
          setUserAuthorized();
          push("/lesson");
        } else {
          errorPassword = true;
          throw new Error("Password not correct");
        }     
      })
      .catch(error => message = error);
  }
</script>

<div class="flex flex-col justify-center items-center min-h-screen py-16">
  <div class="rounded border bg-white py-12 px-16 inline-block text-center">
    <div class="text-black text-2xl mb-8">Log in</div>
    <form action="" on:submit={checkUser}>
      <div class="custom-input mb-8" class:error={errorLogin}>
        <span class="icon"><i class="icon-login"></i></span>
        <input type="text" class="input" bind:value={login} maxlength="15" autocomplete="nickname" placeholder="Login">
      </div>
      <div class="custom-input mb-8" class:error={errorPassword}>
        <span class="icon"><i class="icon-password"></i></span>
        <input type="password" class="input" bind:value={password} maxlength="15" autocomplete="current-password" placeholder="Password">
      </div>
      {#if message}
        <div class="mb-4 text-red-600" in:fade={{ duration: 300 }}>{message}</div> 
      {/if}     
      <Button type="primary" on:click={checkUser}>Enter</Button>     
    </form>
  </div>
  <br/>
  <span>test 1 <br/> makarenalog 123456</span>
</div>

<style>
  .custom-input {
    @apply border border-grey-5 rounded pl-2 py-2;
  }
  .input {
    padding: 0;
    border: none;
    outline: none;
  }
  .error {
    @apply border-red-600;
  }
</style>