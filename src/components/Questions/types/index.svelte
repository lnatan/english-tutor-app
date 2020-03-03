<script>
  import Radio from "./Radio.svelte"; 
  import Check from "./Check.svelte";
  import Insert from "./Insert.svelte";
  import Column from "./Column.svelte";
  export let question;
  export let selected;

  const controls = {
    select: Radio,
    word: Radio,   
    check: Check,
    insert: Insert,   
    column: Column
  };
</script>

<svelte:component this={controls[question.type]} {selected} {question} on:select />