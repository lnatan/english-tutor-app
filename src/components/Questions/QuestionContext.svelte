<script>
  export let type;
  export let selected;
  export let active;
  export let context;

  let fragment;
  $: if (type !== "check") {
    fragment = getActiveFragment(context, active + 1);
  }
  
  function getActiveFragment(text, key){
    const regexp = new RegExp('(?<=' + key + '>)(.*?)(?=<\/' + key + '>)');
    let rezult;
    rezult = text.match(regexp)[0];
    rezult = rezult.replace(/(?=<)(.*?)(?:>)/g, "");
    return rezult;
  };

  // function addHighlight(text, element){    
  //   const regexp = new RegExp(element, "gi");
  //   let rezult;
  //   rezult = text.replace(regexp, "BLABLA");
  //   return rezult;
  // };
</script>

{#if type !== "check"}
  <div class="mt-4 text-xl text-justify">{fragment}</div>
{/if}


<style>
  .highlight {
    @apply bg-primary;
  }
</style>
