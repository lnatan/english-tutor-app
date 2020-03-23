<script>
  import { createEventDispatcher } from 'svelte';
  import { userStore } from "src/stores/userStore.js";
  import Button from "components/UI/Button.svelte";
  export let questionsCount;
  export let answers;
  const dispatch = createEventDispatcher(); 

  const notAnswered = findNotAnswered();
  const ishalfAnswered = questionsCount/notAnswered.length > 2;

  function handleSendClick(){
    dispatch("send");
  };
  function prevQuestion() {
    dispatch("click", {newActive: questionsCount - 1});
  };

  function findNotAnswered(index = 0, result = []){
    if (index === questionsCount) {
      return result;
    }
    if (!answers.hasOwnProperty(index)) {
      result.push(index);
    }
    return findNotAnswered(index + 1, result);
  };
</script>

<div class="container rounded border bg-white p-8">
  <h1 class="text-black text-xl mb-6">Finish test</h1>
  <p class="">You are close to finish the test and send results. </p>
  {#if notAnswered}
    <p>Not answered questions: {notAnswered.map(q => q+1).join(" , ")}</p>
  {/if}
  {#if !ishalfAnswered}
    <p>You did not answer more than half.</p>
  {/if}   
</div>

<!-- Buttons -->
<div class="flex p-8 justify-center md:justify-end">
  <Button type="secondary" on:click={prevQuestion}>Previous</Button>
  <Button type="primary" 
    disabled={!ishalfAnswered || $userStore.role === "teacher"} 
    on:click={handleSendClick}>
      Send
  </Button> 
</div>