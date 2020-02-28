<script>
  import { store, updateActive } from "./store.js";
  export let title;
  export let nav = [];
 
  $: active = $store.active;
  // $: answers = $store.answers;
  
  function changeQuestion(i){
    updateActive(i);
  } 

  const shortTitle = (title) => {
    return title.split(" ").slice(0, 6).join(" ");
  };
</script>

<div class="questions">
  <div class="border px-4 py-2">
      {title} 
      <!-- <button class="float-right">
        <span class="icon"><i class="icon-arrow-up" /></span>
      </button> -->
  </div>
  <div class="pr-4 pl-2 py-2">  
    {#each nav as item, i}
      <a class="item" class:active={i === active} href="/#{i}" on:click|preventDefault={() => changeQuestion(i)}>
        <span class="px-2">{i+1}</span>
        <span>{shortTitle(item.title)}...</span> 
        <span class="px-2">+</span>     
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
