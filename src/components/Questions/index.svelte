<script>
  import { onMount } from "svelte";
  import Layout from "src/routes/Layout.svelte";
  import Button from "components/UI/Button.svelte";  
  import Notification from "components/UI/Notification.svelte";
  import QuestionArea from "components/Questions/QuestionArea.svelte";
  import QuestionsNav from "components/Questions/QuestionsNav.svelte";
  import { getTest, sendTestResult } from "src/actions/testAction.js";
  import { userStore } from "src/stores/userStore.js";
  import { answersStore, getNotAnswered, setAnswersStore, clearAnswersStore, addAnswer } from "src/stores/answersStore.js";
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
  });

  setAnswersStore(params.test, params.lesson);

  function changeActive({ detail }){
    active = detail.newActive;
  };

  function changeAnswers({ detail }){
    addAnswer(detail.newAnswer);
  };

  async function showNotification(message){ 
    await new Promise(resolve => {       
      isNotification = false;     
      setTimeout(resolve, 300);
    });

    await new Promise(resolve => {
      notificationMessage = message;  
      isNotification = true;
      setTimeout(resolve, 1500);
    });
  };

  async function hideNotification(){ 
    await new Promise(resolve => {       
      isNotification = false;     
      setTimeout(resolve, 300);
    });
  };

  async function sendAnswers(){
    document.body.classList.add("pointer-events-none");
    
    const notAnsweredQuestions = getNotAnswered(test.questions.length);
    if (test.questions.length/notAnsweredQuestions.length < 2) {
      showNotification("Too early to send results")
      .then(() => {
        hideNotification();
        document.body.classList.remove("pointer-events-none");
      });
      return;
    }

    await showNotification("<span class='icon'><i class='icon-loading'></i></span>Test is sending...")
      .then(() => sendTestResult($answersStore, $userStore.login))
      .then(() => showNotification("Congratulations! Test results successfully send!"))
      .then(() => hideNotification())
      .then(() => (async () => {
        clearAnswersStore();
        pop();
      })())
      .catch(() => (async () => {
        await showNotification("Sending is failed! Please, try again.");
        await hideNotification();
      })());    
      
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

