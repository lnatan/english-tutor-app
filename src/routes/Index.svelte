<script>
  import { link } from 'svelte-spa-router';
  import Button from "components/UI/Button.svelte";
</script>

<div class="flex flex-col justify-center items-center min-h-screen py-16">
  <div class="rounded border bg-white py-12 px-16 inline-block text-center">
    <div class="text-black text-2xl mb-8">Sign in</div>
    <form action="">
      <div class="custom-input mb-8">
        <span class="icon"><i class="icon-login"></i></span>
        <input type="text" class="input" placeholder="Login" value="">
      </div>
      <div class="custom-input mb-8">
        <span class="icon"><i class="icon-password"></i></span>
        <input type="password" class="input" placeholder="Password" value="">
      </div>
      <Button type="primary">Log In</Button>     
    </form>
  </div>
  <br/>
  <a href="/lesson" use:link class="text-primary">Enter</a>
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
</style>