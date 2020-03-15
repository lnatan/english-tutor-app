<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from "svelte/transition";
  export let title;
  export let nav = [];
  export let active;
  export let answers;
  const dispatch = createEventDispatcher();
    
  const shortTitle = (title) => {
    return title.split(" ").slice(0, 6).join(" ");
  };

  $: isAnswered = (questionIndex) => {
    return answers.hasOwnProperty(questionIndex);
  };

  function changeQuestion(i){
    dispatch("click", {newActive: i});
  };
</script>

<div class="questions-list">
  <div class="border-t border-b px-4 py-2">
      {title} 
      <!-- <button class="float-right">
        <span class="icon"><i class="icon-arrow-up" /></span>
      </button> -->
  </div>
  <div class="pr-2 pl-2 py-2">  
    {#each nav as item, i (i)}
      <a class="item" class:active={i === active} href="/#{i}" on:click|preventDefault={() => changeQuestion(i)}>
        <span class="px-2">{i+1}</span>
        <span>{shortTitle(item.title)}...</span> 
        <span class="check mr-2">
          {#if isAnswered(i)}
            <span class="icon" in:fade={{ duration: 300 }}>
              <i class="icon-check"></i>
            </span>
          {/if}
        </span>  
      </a>
    {/each}
      <a class="item" class:active={active === nav.length} href="/#last" on:click|preventDefault={() => changeQuestion(nav.length)}>
        <span class="pl-2">Finish test</span> 
      </a>
  </div>    
</div>

<style>
  .space {
    @apply px-4 py-2;
  }
  .item {
    @apply block py-2 text-sm relative;
  }
  .item.active {
    @apply bg-blue-1 rounded;
  }
  .item:hover {    
    @apply text-primary;
  }
  .check {
    position: absolute;
    top: 9px;
    right: 0;
  }
</style>
