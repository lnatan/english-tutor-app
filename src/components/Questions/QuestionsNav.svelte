<script>
  // import Dropdown from "components/UI/Dropdown.svelte"
  // import { link, location } from "svelte-spa-router"; 
  import { test } from "src/stores/test.js";
  export let title;
  export let questions = [];

  questions = questions.map(q => {
    return q.split(" ").slice(0, 6).join(" ");
  })

  // let activeQuestion;
  // const unsubscribe = test.subscribe(({active}) => {
	// 	activeQuestion = active;
  // }); 

  $: activeQuestion = $test.active;

  function changeQuestion(i){
    test.changeActive(i);
  }
</script>

<div class="font-semibold text-black px-4 py-2">
  Lesson plan
</div>
<div class="questions">
  <div class="border px-4 py-2">
      {title} 
      <!-- <button class="float-right">
        <span class="icon"><i class="icon-arrow-up" /></span>
      </button> -->
  </div>
  <div class="pr-4 pl-2 py-2">  
    {#each questions as q, i}
      <a class="item" class:active={i === activeQuestion} href="#{i}" on:click|preventDefault={() => changeQuestion(i)}>
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
  .item {
    @apply block py-2 text-sm;
  }
  .item.active {
    @apply bg-blue-1 rounded;
  }
  .item:hover {    
    @apply text-primary;
  }
</style>
