<script>
  import Radio from "./Radio.svelte";
  import Word from "./Word.svelte"; 
  import Check from "./Check.svelte";
  import Insert from "./Insert.svelte";
  import Column from "./Column.svelte";
  export let question;
  export let selected;
  export let context;

  // $: console.log(context);

  const components = {
    select: Radio,
    word: Word,   
    check: Check,
    insert: Insert,   
    column: Column
  };

  const addition = {
    // word: "word",
    insert: "sentence",
    column: "columns"
  };

  function getProps(type, context){   
    let props = {};

    if (context !== null && context !== undefined) {
      props.context = context;
    }

    if (addition[type]) {
      props[addition[type]] = question[addition[type]];
    }
    
    return props;
  }  

  $: props = getProps(question.type, context);
</script>

<svelte:component  
  this={components[question.type]}
  variants={question.variants}
  {...props}
  {selected}
  on:select 
/>