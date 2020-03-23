<script>
  import { onMount } from "svelte";
  import Layout from "src/routes/Layout.svelte";
  import Button from "components/UI/Button.svelte";  
  import Notification from "components/UI/Notification.svelte";
  import QuestionArea from "components/Questions/QuestionArea.svelte";
  import QuestionsNav from "components/Questions/QuestionsNav.svelte";
  import QuestionScore from "components/Questions/QuestionScore.svelte";
  import { getTest, addTestResult } from "src/actions/testAction.js";
  import { userStore } from "src/stores/userStore.js";
  import { completedTests } from "src/stores/testStore.js";
  import { answersStore, initAnswersStore, addAnswerToAnswersStore, clearAnswersStore } from "src/stores/answersStore.js";
  import { pop } from "svelte-spa-router";
  export let params = {};
  
  let test;
  let active = 0;
  let notificationMessage; 
  let isNotification = false;
    
  onMount(async () => {
    const showAnswers = $userStore.role === "teacher";
    test = await getTest(params.test, showAnswers);
    initAnswersStore(test.title, params.lesson, params.state);
  });   

  function changeActive({ detail }){
    active = detail.newActive;
  };

  function changeAnswers({ detail }){
    addAnswerToAnswersStore(detail.newAnswer);
  };

  async function showNotification(message){ 
    await new Promise(resolve => { 
      notificationMessage = message;  
      isNotification = true;
      setTimeout(resolve, 2500);
    });
    await new Promise(resolve => {   
      isNotification = false;
      setTimeout(resolve, 300);
    });
  };

  async function sendAnswers(){
    document.body.classList.add("pointer-events-none");

    try {
      await Promise.all([
        showNotification("<span class='icon'><i class='icon-loading'></i></span>Test is sending..."),
        addTestResult($answersStore, $userStore.login)
      ]);
      await showNotification("Congratulations! Test results successfully send!");
    } catch(error) {
      await showNotification("Sending is failed! Please, try again.");
    }
    
    await new Promise((resolve) => {
      document.body.classList.remove("pointer-events-none");
      clearAnswersStore();
      setTimeout(() => {
        pop();      
        resolve();
      }, 1000);
    });    
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
        <div class="font-semibold text-black px-4 py-2">
          <span class="capitalize">{params.lesson}</span> plan
          {#if $userStore.role === "teacher"}
            for {$completedTests.name}
          {/if}
        </div>
        <QuestionsNav          
          {active}
          answers={$answersStore}
          questions={test.questions} 
          title={test.title}
          on:click={changeActive}
        />
      </div>
    </div>    
    <div slot="main">
      {#if active < test.questions.length}
        <QuestionArea       
          {active}
          answers={$answersStore}
          question={test.questions[active]} 
          context={test.fragments[active]}
          on:click={changeActive} 
          on:select={changeAnswers}
        />
      {:else}
        <QuestionScore
          questionsCount={test.questions.length}
          on:click={changeActive} 
          on:send={sendAnswers}
        />
      {/if}
    </div>
  </Layout>
{/if}

{#if isNotification}
  <Notification>
    {@html notificationMessage}
  </Notification>
{/if}

