<script>
  import Layout from "../_layout.svelte";
  import Sidebar from "../../components/Sidebar.svelte";
  import QuestionArea from "../../components/Questions/QuestionArea.svelte";
  import QuestionsNav from "../../components/Questions/QuestionsNav.svelte";
  import { link, push, pop, replace, location, querystring } from 'svelte-spa-router'; 
  import { pathToTests } from "../../config.js";
  export let params = {};
  
  const URL = `${pathToTests}/${params.test}.json`;
  let test = getTest();

 	async function getTest(){
    try {
      const res = await fetch(URL);
      const data = await res.json();
      return data;
    } catch(err) {  
      // not found or ?  
      throw new Error(err);
    }
	}
</script>

<Layout>
  <div slot="sidebar">
    <Sidebar 
      heading="heading"
      nav="nav"
     />
    <!-- <a href="/lessons" use:link class="underline">Back</a> -->
  </div>
  <div slot="main"> 
    {#await test then data}
      <QuestionArea {data} /> 
    {:catch error}
      <p>{error}</p>
    {/await}
  </div>
</Layout>