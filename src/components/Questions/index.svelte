<script>
  import { onMount } from "svelte";
  import Layout from "src/routes/Layout.svelte";
  import Button from "components/UI/Button.svelte";  
  import Notification from "components/UI/Notification.svelte";
  import QuestionArea from "components/Questions/QuestionArea.svelte";
  import QuestionsNav from "components/Questions/QuestionsNav.svelte";
  import { getTest, addTestResult } from "src/actions/testAction.js";
  import { userStore } from "src/stores/userStore.js";
  import { answersStore, initAnswersStore, addAnswer } from "src/stores/answersStore.js";
  import { pop } from "svelte-spa-router";
  export let params = {};

  let test;
  let active = 0;
  let isNotification = false;
  let notificationMessages = "Answers are sending...";

  // console.log($answersStore);

  onMount(async () => {
    const withAnswers = $userStore.role === "teacher";
    test = await getTest(params.test, withAnswers);    
  });

  initAnswersStore(params.test, params.lesson);

  function changeActive({ detail }){
    active = detail.newActive;
  };

  function changeAnswers({ detail }){
    addAnswer(detail.newAnswer);
  };

  function sendAnswers(){
    isNotification = true;
    document.body.classList.add("pointer-events-none");
    
    addTestResult($answersStore, $userStore.login)
    .then(() => notificationMessages = "Congratulations! Test results successfully send!")
    .catch(error => {
      notificationMessages = error;
      // setTimeout(() => { isNotification = false }, 5000);
    }); 

    // document.body.classList.remove("pointer-events-none");
    // pop();
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
    <div class="flex items-center">
      {notificationMessages}
    </div>
  </Notification>
{/if}