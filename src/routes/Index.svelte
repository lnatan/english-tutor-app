<script>
  import { link } from 'svelte-spa-router';
</script>

<div class="container py-12">
  <p>
    Enter the <a href="/lesson" use:link class="text-primary"> App </a>
  </p> 
  <div>
    <form action="">
      <input type="text" class="border" placeholder="Name" value=""/>
      <br>
      <input type="text" class="border mt-4" placeholder="Password"/>
      <br>
      <button type="submit" class="bg-primary mt-4 px-6 py-1">submit</button>
    </form>
  </div>
</div>