<script>
  import { onMount } from "svelte";
  import Layout from "src/routes/Layout.svelte";
  import Button from "components/UI/Button.svelte";  
  import Notification from "components/UI/Notification.svelte";
  import QuestionArea from "components/Questions/QuestionArea.svelte";
  import QuestionsNav from "components/Questions/QuestionsNav.svelte";
  import { getTest, addTestResult } from "src/actions/testAction.js";
  import { userStore } from "src/stores/userStore.js";
  import { answersStore, addParamsToAnswersStore, addAnswerToAnswersStore, clearAnswersStore } from "src/stores/answersStore.js";
  import { pop } from "svelte-spa-router";
  export let params = {};

  let test;
  let active = 0;
  let notificationMessage; 
  let isNotification = false;
  
  // console.log($answersStore);

  onMount(async () => {
    const withAnswers = $userStore.role === "teacher";
    test = await getTest(params.test, withAnswers);  
    addParamsToAnswersStore(test.title, params.lesson);     
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

  function sendAnswers(){
    document.body.classList.add("pointer-events-none");

    (async () => {
      try {
        await Promise.all([
          showNotification("<span class='icon'><i class='icon-loading'></i></span>Test is sending..."),
          addTestResult($answersStore, $userStore.login)
        ]);
        await showNotification("Congratulations! Test results successfully send!");
        clearAnswersStore();
        pop();
      } catch(error) {
        await showNotification("Sending is failed! Please, try again.");
      }
    })();
  
    document.body.classList.remove("pointer-events-none");
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
          answers={$answersStore}
          nav={test.questions} 
          title={test.title}
          on:click={changeActive}
        />
      </div>
    </div>    
    <div slot="main">
      <QuestionArea 
        {active} 
        answers={$answersStore}
        question={test.questions[active]} 
        context={test.fragments[active]}    
        questionsCount={test.questions.length}           
        on:click={changeActive} 
        on:select={changeAnswers}    
        on:send={sendAnswers}   
      />
      <!-- Score -->
      <!-- Buttons -->
    </div>
  </Layout>
{/if}

{#if isNotification}
  <Notification>
    {@html notificationMessage}
  </Notification>
{/if}

