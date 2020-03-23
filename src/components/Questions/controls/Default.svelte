<script>
  export let question;
  export let selected;
  export let context = "";
  import { showHighlight, showSlots } from "src/utils/parseTest.js";
  
  $: isSelected = (variant, column) => {   
    if (selected === undefined) return false;

    if (question.type === "check") { 
      return selected.includes(variant);
    }

    if (question.type === "column") {
      return JSON.parse(selected)[variant] === column;
    }

    return variant === Number(selected);
  };
</script>

{#if question.type === "column"}
  {#each question.variants as item, i}
    <div class="lg:flex justify-between pb-4">
      <span class="pr-4">{i+1}. {item.variant}</span>
      <div class="flex">
        {#each question.columns as { column }, k}
          <div class="py-2" class:is-correct={item.answer === k} class:is-selected={isSelected(i,k)}>
            <span class="variant p-2" >
              {column}
            </span>         
          </div>   
        {/each}
      </div>
    </div>
  {/each}
{:else}
  {#each question.variants as item, i}
    <div class="pb-1">
      <span class="inline-block variant p-2" class:is-correct={item.answer} class:is-selected={isSelected(i)} >
        {item.variant}
      </span>
    </div>
  {/each}
{/if}

<!-- Context -->
{#if question.type === "word"}
  <div class="mt-4 text-xl text-justify">{@html showHighlight(question.word, context)}</div>
{:else if  question.type === "insert"}
  <div class="sentence p-2 mt-4">{question.sentence}</div>
  <div class="mt-4 text-xl text-justify">{@html showSlots(context)}</div>
{:else}
  <div class="mt-4 text-xl text-justify">{@html context}</div> 
{/if}

<style>
  .is-correct {
    @apply bg-green-200;
  }
  .is-selected {
    @apply border border-grey-6 border-2;
  }
</style>