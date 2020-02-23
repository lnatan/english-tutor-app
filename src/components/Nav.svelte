<script>
  import {link, push, pop, replace, location, querystring} from 'svelte-spa-router'; 
  import active from 'svelte-spa-router/active';
  export let links = [];
</script>

<!-- Navigation links, using the "link" action -->
<!-- Also, use the "active" action to add the "active" CSS class when the URL matches -->
 <!-- <nav class="space shadow bg-color hidden md:block">
  <div class="container">
    <ul class="nav">
        <li><a href="/" use:link use:active>Profile</a></li>
        <!-- <li><a href="/hello/" use:link use:active={{path: '/hello/*', className: 'active'}}>Hello</a></li> -->
        <!-- <li><a href="/reading/" use:link use:active={{path: '/reading/*', className: 'active'}}>Reading</a></li>
    </ul>
  </div>
</nav> --> 

<nav>
  <ul>
    {#each links as [path, name]}
      <li><a href={path} use:link use:active>{name}</a></li>
    {/each}
  </ul>
</nav>

<style>
  /* .shadow {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.15);
  }
  .space {
    @apply px-4 py-6;
  }
  .bg-color {
    @apply bg-white;
  } */
  :global(a.active) {
    @apply font-bold;
   }
</style>
