<script>
  import { createEventDispatcher } from "svelte";
  import { push } from "svelte-spa-router";
  import { sortByDate } from "src/utils/sort.js";
  import { userStore } from "src/stores/userStore.js"; 
  export let route;
  export let completed;
  export let active; 
  const dispatch = createEventDispatcher();  

  $: sortedActive = active && active.sort(sortByDate) || [];
  $: sortedCompleted = completed && completed.sort(sortByDate) || [];

  function handleUpdateClick(){
    dispatch("update");
  };  
  
  const slug = (title) => title.toLowerCase().replace(/\s/g, "-");
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");
</script>

<!-- Active lessons -->
<div class="pb-4">
  <div class="flex justify-between items-center px-6 pb-4">
    <h2 class="title">Active</h2>
    <button on:click={handleUpdateClick}>Update</button>
  </div>
  <div class="rounded border bg-white p-6">
    {#if !sortedActive.length}
      No active
    {:else}
      {#each sortedActive as item}
        <div class="py-4 border-b last:border-b-0" >
          <button on:click={push(`/${route.lesson}/active/${slug(item.title)}`)}>
             <span class="text-lg">{item.title}</span> 
             <span class="text-primary px-2">Start</span>
          </button>
          <br/>
          <span>Due: {formatDate(item.date)}</span>
        </div>
      {/each}
    {/if}
  </div>
</div>

<!-- Completed lessons -->
<div class="mt-4 pb-4">
  <div class="flex justify-between items-center px-6 pb-4">
    <h2 class="title">Completed</h2>
    <button on:click={handleUpdateClick}>Update</button>
  </div>
  <div class="rounded border bg-white p-6">
    {#if !sortedCompleted.length}
      No completed
    {:else}
      {#each sortedCompleted as item}
        <div class="py-4 border-b last:border-b-0" >
          {#if $userStore.role === "teacher"}
            <div>
              <button on:click={push(`/${route.lesson}/completed/${slug(item.title)}`)}>
                <span class="text-lg">{item.title}</span> 
                <span class="text-primary px-2">View</span>
              </button>
            </div>
          {:else}
            <div class="text-lg">{item.title}</div>
          {/if}
          <span>Finish: {formatDate(item.date)}</span>
        </div>
      {/each}     
    {/if}
  </div>
</div>