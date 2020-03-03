<script>
  import { link } from 'svelte-spa-router';
  import Button from "components/UI/Button.svelte";
</script>

<div class="flex flex-col justify-center items-center min-h-screen py-16">
  <div class="rounded border bg-white py-12 px-16 inline-block text-center">
    <div class="text-black text-xl mb-8">Sign in</div>
    <form action="">
      <input type="text" class="border rounded pl-2" placeholder="Login" value=""/>
      <br/>
      <input type="password" class="border rounded pl-2 mt-4" placeholder="Password"/>
      <div class="mt-10">
        <Button type="primary">Log In</Button>
      </div>      
    </form>
  </div>
  <br/>
  <a href="/lesson" use:link class="text-primary">Enter</a>
</div>