<script>
  import { createEventDispatcher } from 'svelte';
  import { push } from "svelte-spa-router";
  export let params = "";
  export let complited = [];
  export let active = []; 
  const dispatch = createEventDispatcher();

  const slug = (title) => title.toLowerCase().replace(/\s/g, "-");
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");

  function handleUpdateClick(){
    dispatch("update");
  };
</script>

<!-- Active lessons -->
<div class="pb-4">
  <h2 class="title pb-4 px-6">Active</h2>
  <div class="rounded border bg-white p-6">
    {#if !active.length}
      No active
    {:else}
        {#each active as item}
          <div class="py-4 border-b last:border-b-0" >
            <button class="text-lg" on:click={push(`/${params}/${slug(item.title)}`)}>{item.title}</button>
            <button class="text-primary px-2" on:click={push(`/${params}/${slug(item.title)}`)}>Start</button>
            <br/>
            <span>Due: {formatDate(item.date)}</span>
          </div>
        {/each}
    {/if}
  </div>
</div>

<!-- Complited lessons -->
<div class="mt-4 pb-4">
  <div class="flex justify-between items-center px-6 pb-4">
    <h2 class="title">Complited</h2>
    <button on:click={handleUpdateClick}>Update</button>
  </div>
  <div class="rounded border bg-white p-6">
    {#if !complited.length}
      No complited
    {:else}
        {#each complited as item}
          <div class="py-4 border-b last:border-b-0" >
            <button class="text-lg" on:click={push(`/${params}/${slug(item.title)}`)}>{item.title}</button>
            <button class="text-primary px-2" on:click={push(`/${params}/${slug(item.title)}`)}>View</button>
            <br/>
            <span>Finish: {formatDate(item.date)}</span>
          </div>
        {/each}
    {/if}
  </div>
</div>