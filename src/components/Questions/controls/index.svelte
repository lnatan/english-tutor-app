<script>
  import Radio from "./Radio.svelte";
  import Word from "./Word.svelte"; 
  import Check from "./Check.svelte";
  import Insert from "./Insert.svelte";
  import Column from "./Column.svelte";
  export let question;
  export let selected;
  export let context;

  const components = {
    select: Radio,
    word: Word,   
    check: Check,
    insert: Insert,   
    column: Column
  };

  const addition = {
    word: "word",
    insert: "sentence",
    column: "columns"
  };

  function getProps(type){
    let props = {};

    if (context !== null) {
      props.context = context;
    }

    if (addition[type]) {
      props[addition[type]] = question[addition[type]];
    }
    return props;
  }  

  $: props = getProps(question.type);
</script>

<svelte:component  
  this={components[question.type]}
  variants={question.variants}
  {...props}
  {selected}
  on:select 
/>