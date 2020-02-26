<script>
  import { link } from "svelte-spa-router"; 
  import active from "svelte-spa-router/active";  
  export let menu = [];
  export let title;

  let state = "open";
</script>

<div class="dropdown {state}">
  <div class="dropdown-trigger">
      {title} 
      <button class="float-right">
        <span class="icon"><i class="icon-arrow-up" /></span>
      </button>
  </div>
  <div class="dropdown-menu">
    <ul>
      {#each menu as item, index}
        <li class="py-2 text-sm">
          <a href="/lessson/123" use:link use:active>
            <span class="pr-2">{index+1}</span>
            <span>{@html item}</span>      
          </a>
        </li>
      {/each}
    </ul>
  </div>    
</div>

<style>
  .dropdown-trigger {
    @apply border px-4 py-2;
  }
  .dropdown-menu {
    @apply px-4 py-2;
  }
</style>