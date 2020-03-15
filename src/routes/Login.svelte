<script>
  import Button from "components/UI/Button.svelte";
  import { push } from 'svelte-spa-router';
  import { fade } from "svelte/transition";
  import { logIn } from "src/actions/loginAction.js";

  let login = "";
  let password = "";
  let message = "";
  let isLoginFocused = true;
  let validLogin = true;
  let validPassword = true;

  function validateForm(){
    login = login.trim();
    password = password.trim();
    validLogin = login.length !== 0;
    validPassword = password.length !== 0;
    return validLogin && validPassword;
  };

  async function submitForm(event){
    event.preventDefault();    

    if (!validateForm()) {
      return;
    }
    
    try {
      await logIn(login, password);
      push("/lesson");
    } catch(error){
      if (error.message === "404") {
        validLogin = false;
        message = `User '${login}' not found`;
        return;
      }
      if (error.message === "Password not correct") {
        validPassword = false;
        message = error.message;
        return;
      }
    }    
  }
</script>

<div class="flex flex-col justify-center items-center min-h-screen py-16">
  <div class="rounded border bg-white py-12 px-16 inline-block text-center">
    <div class="text-black text-2xl mb-8">Log in</div>
    <form action="" on:submit={submitForm}>
      <div class="custom-input mb-8" class:error={!validLogin}>
        <span class="icon"><i class="icon-login"></i></span>
        <input type="text" class="input" autofocus bind:value={login} maxlength="15" autocomplete="nickname" placeholder="Login">
        <span class="focus"></span>
      </div>
      <div class="custom-input mb-8" class:error={!validPassword}>
        <span class="icon"><i class="icon-password"></i></span>
        <input type="password" class="input" bind:value={password} maxlength="15" autocomplete="current-password" placeholder="Password">
        <span class="focus"></span>
      </div>
      {#if message}
        <div class="mb-4 text-red-600" in:fade={{ duration: 300 }}>{message}</div> 
      {/if}     
      <Button type="primary" on:click={submitForm}>Enter</Button>     
    </form>
  </div>
  <br/>
  <span>test 1 <br/> teacher 123456</span>
</div>

<style>
  .custom-input {
    @apply border border-grey-5 rounded pl-2 py-2 relative;
  }
  .input {
    padding: 0;
    border: none;
    outline: none;
  }
  .error {
    @apply border-red-600;
  }
  .custom-input:not(.error) .input:focus + .focus {
    @apply absolute border rounded border-blue-5 top-0 left-0 bottom-0 right-0;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
</style>