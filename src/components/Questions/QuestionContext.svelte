<script>
  export let type;
  export let selected;
  export let active;
  export let context;

  let fragment;
  $: fragment = getActiveFragment(context, active + 1);
  
  function getActiveFragment(text, key){
    const regexp = new RegExp('(?<=' + key + '>)(.*?)(?=<\/' + key + '>)');
    let rezult = text.match(regexp);

    if (rezult === null) {
      console.log("No context provided or context should be markuped");
      return;
    }

    rezult = rezult[0].replace(/(?=<)(.*?)(?:>)/g, "");
    return rezult;
  };

  // function addHighlight(text, element){    
  //   const regexp = new RegExp(element, "gi");
  //   let rezult;
  //   rezult = text.replace(regexp, "BLABLA");
  //   return rezult;
  // };
</script>

{#if fragment}
  <div class="mt-4 text-xl text-justify">{fragment}</div>
{/if}


<style>
  .highlight {
    @apply bg-primary;
  }
</style>
