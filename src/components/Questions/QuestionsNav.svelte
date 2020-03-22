<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from "svelte/transition";
  import { getRightAnswer, parseAnswer } from "src/utils/parseAnswer.js";
  export let title;
  export let questions;
  export let active;
  export let answers;
  const dispatch = createEventDispatcher();  
  
  $: isAnswered = (questionIndex) => {
    return answers.hasOwnProperty(questionIndex);
  };

  const shortTitle = (title) => {
    return title.split(" ").slice(0, 6).join(" ");
  };

  const showAnswer = (question, answer) => {
    if (answer === undefined) {
      return " ";
    }

    const studentAnswer = parseAnswer(answer);
    const rightAnswer = getRightAnswer(question);

    return studentAnswer.toString() === rightAnswer.toString() ? "is-answer-right" : "is-answer-wrong";
  };

  function changeQuestion(i){
    dispatch("click", {newActive: i});
  };
</script>

<div class="questions-list">
  <div class="border-t border-b px-4 py-2">{title}</div>
  <div class="pr-2 pl-2 py-2">  
    {#each questions as question, i (i)}
      {#if answers.state === "completed"}
        <a href="/#{i}"
          class="item {showAnswer(question, answers[i])}"
          class:is-active={i === active} 
          on:click|preventDefault={() => changeQuestion(i)}>
            <span class="px-2">{i+1}</span>
            <span>{shortTitle(question.title)}...</span> 
        </a>
      {:else}
        <a href="/#{i}"
          class="item"
          class:is-active={i === active} 
          on:click|preventDefault={() => changeQuestion(i)}>
            <span class="px-2">{i+1}</span>
            <span>{shortTitle(question.title)}...</span>        
            {#if isAnswered(i)}
              <span class="check mr-2">
                <span class="icon" in:fade={{ duration: 300 }}>
                  <i class="icon-check"></i>
                </span>
              </span>  
            {/if}
        </a>
      {/if}      
    {/each}
      <a href="/#finish" 
        class="item" 
        class:active={active === questions.length}         
        on:click|preventDefault={() => changeQuestion(questions.length)}>
        <span class="pl-2">Finish test</span> 
      </a>
  </div>    
</div>

<style>
  .space {
    @apply px-4 py-2;
  }
  .item {
    @apply block py-2 text-sm relative;
  }  
  .item:hover {    
    @apply text-primary;
  }
  .item.is-active {
    @apply bg-blue-1 rounded;
  }
  .item.is-answer-right {
    @apply border-l-4 border-green-600;
  }
  .item.is-answer-wrong {
    @apply border-l-4 border-red-600;
  }
  .check {
    position: absolute;
    top: 9px;
    right: 0;
  }
</style>
