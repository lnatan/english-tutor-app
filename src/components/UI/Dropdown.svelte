<script>
  import { link, location } from "svelte-spa-router"; 
  import active from "svelte-spa-router/active";  
  export let menu = [];
  export let title;

  let state = "open";
</script>

<div class="dropdown {state}">
  <div class="border-b border-t px-4 py-2">
      {title} 
      <!-- <button class="float-right">
        <span class="icon"><i class="icon-arrow-up" /></span>
      </button> -->
  </div>
  <div class="dropdown-menu">  
    {#each menu as item, index}
      <a class="dropdown-item" href={$location} use:link>
        <span class="px-2">{index+1}</span>
        <span>{@html item}</span>      
      </a>
    {/each}
  </div>    
</div>

<style>
  .space {
    @apply px-4 py-2;
  }
  .dropdown-trigger {
    @apply border px-4 py-2;
  }
  .dropdown-menu {
    @apply pr-4 pl-2 py-2;
  }
  .dropdown-item {
    @apply block py-2 text-sm;
  }
  .dropdown-item.active {
    @apply text-primary;
  }
  .dropdown-item:hover {
    @apply bg-blue-1 rounded;
  }
</style>