<script>
  import { link, push } from 'svelte-spa-router';
  import { fade } from "svelte/transition";
  import Button from "components/UI/Button.svelte";
  import { userName, userLogin } from "../store/userStore.js";

  let login;
  let password;
  let message = "";
  let errorLogin = false;
  let errorPassword = false;

  $: console.log(login);

  function checkUser(e){
    e.preventDefault();
    login = login && login.trim();
    password = password && password.trim();

    if (!login) {
      // message += "Empty login field";
      errorLogin = true;
    }

    if (!password) {
      // message += " Empty password field";
      errorPassword = true;
    }

    if (!login || !password) return;

    errorLogin = false;
    errorPassword = false;

    const URL = `/data/users/${login}.json`;
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          console.log(res.status);
          throw Error(`user '${login}' not found`);
        } else {
          return res.json();
        }
      })
      .then(userData => {
        if (userData.password === password) {
          // document.cookie = `user=${login}`;
          userName.update(n => n = userData.name);
          userLogin.update(l => l = userData.login);
          push('/lesson');
        } else {
          throw Error("Password not correct");
        }     
      })
      .catch(error => message = error);
  }
</script>

<div class="flex flex-col justify-center items-center min-h-screen py-16">
  <div class="rounded border bg-white py-12 px-16 inline-block text-center">
    <div class="text-black text-2xl mb-8">Sign in</div>
    <form action="">
      <div class="custom-input mb-8" class:error={errorLogin}>
        <span class="icon"><i class="icon-login"></i></span>
        <input type="text" class="input" bind:value={login} autocomplete="nickname" placeholder="Login">
      </div>
      <div class="custom-input mb-8" class:error={errorPassword}>
        <span class="icon"><i class="icon-password"></i></span>
        <input type="password" class="input" bind:value={password} autocomplete="current-password" placeholder="Password">
      </div>
      {#if message}
        <div class="mb-4 text-red-600" in:fade={{ duration: 300 }}>{message}</div> 
      {/if}     
      <Button type="primary" on:click={checkUser}>Log In</Button>     
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