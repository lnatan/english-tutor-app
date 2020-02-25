<script>
  import { link } from 'svelte-spa-router'; 
  import active from 'svelte-spa-router/active';
  export let questions = [];
  export let title;

  questions = questions.map(q => q.title.split(" ").slice(0,6).join(" "));
</script>

<div class="font-semibold">Lesson plan</div>
<div>{title}</div>
 <ul>
  {#each questions as q, index}
    <li class="py-2 text-sm">
      <a href="/:index" use:link use:active>
        <span class="pr-2">{index+1}</span>
        <span>{q}...</span>      
      </a>
    </li>
  {/each}
</ul>
