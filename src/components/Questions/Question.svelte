<script>
  import Select from "./types/Select.svelte"; 
  import Check from "./types/Check.svelte";
  import Insert from "./types/Insert.svelte";
  import Word from "./types/Word.svelte";
  export let question = {};
  // export let activeQuestion = 0;

  const { title, variants, type, context } = question;

  // const options = {
  //   "select": Select,
  //   "check": Check,
  //   "word": Word,
  //   "insert": Insert
  // };


  let selected = 0;
</script>

<!-- <h1 class="text-black text-xl mb-6">{question.title}</h1>
Type: <svelte:component this={options[question.type]}/>
<br/>
Num: {activeQuestion +1} -->

<h1 class="text-black text-xl mb-6">{title}</h1>
<div class="variants">
  {#each variants as {variant, answer}, i}
    <label for="">
     <span>
        <input type=radio bind:group={selected} value={variant} checked={i===0}>
     </span>
     <span>{variant}</span>
    </label>  
  {/each}
</div>
<div class="context"></div>


<style>
  .variants > * {
    display: block;
  }
</style>