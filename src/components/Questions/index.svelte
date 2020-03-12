<script>
  import { onMount } from "svelte";
  import Layout from "src/routes/Layout.svelte";
  import Button from "components/UI/Button.svelte";  
  import QuestionArea from "components/Questions/QuestionArea.svelte";
  import QuestionsNav from "components/Questions/QuestionsNav.svelte";
  import { parseTest } from "src/utils/parse.js";
  import { testStore, answersStore, addAnswer, getAnswers } from "src/stores/testStore.js";
  import { pop } from "svelte-spa-router";
  export let params = {};

  let test;
  const URL = `./data/tests/${params.test}.json`;  

  onMount(async () => await fetch(URL)
    .then(response => response.json())
    .then(data => test = parseTest(data))
    .catch(error => console.error(error)));

  testStore.set({
    testId: params.test,
    lesson: params.lesson
  });
 
  // $: console.log($testStore);
  // $: getAnswers();
  
  let active = 0;
  let answers = new Map();

  function changeActive({ detail }){
    active = detail.newActive;
  };

  function changeAnswers({ detail }){
    answers = answers.set(...detail.newAnswers);
    addAnswer(detail.newAnswers);
  };
</script>

{#if test}
  <Layout>
    <div slot="sidebar">  
      <div class="sidebar-panel px-4 py-2 mb-6">
        <Button type="link" on:click={pop}>
          <span class="icon pr-2">
            <i class="icon-arrow-left"/>
          </span>  
          Back
        </Button>        
       </div>
      <div class="sidebar-panel">
        <div class="font-semibold capitalize text-black px-4 py-2">
          {params.lesson} plan
        </div>
        <QuestionsNav          
          {active} 
          {answers}
          nav={test.questions} 
          title={test.title}
          on:click={changeActive}
        />
      </div>
    </div>    
    <div slot="main">
      <QuestionArea 
        {active} 
        {answers} 
        question={test.questions[active]} 
        context={test.fragments[active]}    
        questionsCount={test.questions.length}           
        on:click={changeActive} 
        on:select={changeAnswers}
      />
      <!-- Score -->
      <!-- Buttons -->
    </div>
  </Layout>
{/if}