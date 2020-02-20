<script>
  import {link, push, pop, replace, location, querystring} from 'svelte-spa-router'; 
  import active from 'svelte-spa-router/active';
</script>

<style>
  .shadow {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.15);
  }
  .space {
    @apply px-4 py-6;
  }
  .bg-color {
    @apply bg-white;
  }
  :global(a.active) {
    @apply text-pink-800;
   }
</style>

<!-- Navigation links, using the "link" action -->
<!-- Also, use the "active" action to add the "active" CSS class when the URL matches -->
<nav class="space shadow bg-color">
  <div class="container">
    <ul class="nav">
        <li><a href="/" use:link use:active>Home</a></li>
        <li><a href="/hello/" use:link use:active={{path: '/hello/*', className: 'active'}}>Hello</a></li>
        <li><a href="/quiz/" use:link use:active={{path: '/quiz/*', className: 'active'}}>Start quiz</a></li>
        <li><a href="/does/not/exist" use:link use:active>Not found</a></li>
    </ul>
  </div>
</nav>
