<script>
  import { link } from 'svelte-spa-router'; 
  import active from 'svelte-spa-router/active';
  export let links = [];
  export let icon = false;
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
    {#each links as item}
      <li>
        <a href="/{item}" use:link use:active>
          {#if icon}
            <span class="icon pr-2">
              <i class="icon-{item}" />
            </span>
          {/if}          
          {item}              
        </a>
      </li>
    {/each}
  </ul>
</nav>