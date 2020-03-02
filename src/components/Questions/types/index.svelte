<script>
  import Radio from "./Radio.svelte"; 
  import Check from "./Check.svelte";
  import Insert from "./Insert.svelte";
  import Column from "./Column.svelte";
  export let type;
  export let variants;
  export let selected;

  const controls = {
    select: Radio,
    word: Radio,   
    check: Check,
    insert: Insert,   
    column: Column
  };
</script>

<div class="controls">
  <svelte:component this={controls[type]} {selected} {variants} on:select />
</div>