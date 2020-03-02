<script>
  // import { store, updateActive } from "./store.js";
  import { createEventDispatcher } from 'svelte';
  export let title;
  export let nav = [];
  export let active;
  export let answers;
  const dispatch = createEventDispatcher();
    
  const shortTitle = (title) => {
    return title.split(" ").slice(0, 6).join(" ");
  };

  $: hasAnswer = (questionIndex) => {
    return answers.has(questionIndex);
  };

  function changeQuestion(i){
    dispatch("click", {newActive: i});
  };
</script>

<div class="questions-list">
  <div class="border px-4 py-2">
      {title} 
      <!-- <button class="float-right">
        <span class="icon"><i class="icon-arrow-up" /></span>
      </button> -->
  </div>
  <div class="pr-2 pl-2 py-2">  
    {#each nav as item, i}
      <a class="item" class:active={i === active} href="/#{i}" on:click|preventDefault={() => changeQuestion(i)}>
        <span class="px-2">{i+1}</span>
        <span>{shortTitle(item.title)}...</span> 
        <span class="float-right px-2">
          {#if hasAnswer(i)}
            <span class="icon">
              <i class="icon-check"></i>
            </span>
          {/if}
        </span>     
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
