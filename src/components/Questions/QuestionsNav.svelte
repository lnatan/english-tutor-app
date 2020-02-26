<script>
  // import Dropdown from "components/UI/Dropdown.svelte"
  // import { link, location } from "svelte-spa-router"; 
  import { test } from "src/stores/test.js";
  export let title;
  export let questions = [];

  questions = questions.map(q => {
    return q.split(" ").slice(0, 6).join(" ");
  })

  let activeQuestion;

  const unsubscribe = test.subscribe(({active}) => {
		activeQuestion = active;
  }); 

  function changeQuestion(i){
    test.changeActive(i);
  }
</script>

<div class="font-semibold text-black space">
  Lesson plan
</div>
<div class="dropdown">
  <div class="border px-4 py-2">
      {title} 
      <!-- <button class="float-right">
        <span class="icon"><i class="icon-arrow-up" /></span>
      </button> -->
  </div>
  <div class="dropdown-menu">  
    {#each questions as q, i}
      <a class="dropdown-item" class:active={i === activeQuestion} href="/" on:click|preventDefault={() => changeQuestion(i)}>
        <span class="px-2">{i+1}</span>
        <span>{q}...</span>      
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
