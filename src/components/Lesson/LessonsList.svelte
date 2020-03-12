<script>
  import { push } from "svelte-spa-router";
  import { fade } from "svelte/transition";
  export let title = "";
  export let params = "";
  export let lessons = [];  

  const slug = (title) => title.toLowerCase().replace(/\s/g, "-");
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");
</script>


<div class="pb-4">
  <h2 class="title pb-4 px-6">{title}</h2>
  <div class="rounded border bg-white p-6">
    {#if !lessons.length}
      No {title}
    {:else}
        {#each lessons as item}
          <div class="py-4 border-b last:border-b-0" >
            <button class="text-lg" on:click={push(`/${params}/${slug(item.title)}`)}>{item.title}</button>
            <button class="text-primary px-2" on:click={push(`/${params}/${slug(item.title)}`)}>Start</button>
            <br/>
            <span>{formatDate(item.date)}</span>
          </div>
        {/each}
    {/if}
  </div>
</div>