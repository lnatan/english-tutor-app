<script>
  import Select from "./types/Select.svelte"; 
  import Check from "./types/Check.svelte";
  import Insert from "./types/Insert.svelte";
  import Word from "./types/Word.svelte";
  export let question = {};

  const options = {
    "select": Select,
    "check": Check,
    "word": Word,
    "insert":  Insert
  };

</script>

<h1 class="text-black text-xl mb-6">{question.title}</h1>
<svelte:component this={options[question.type]}/>