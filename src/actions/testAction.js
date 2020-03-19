import { parseTestContext, deleteAnswersFromTest } from "src/utils/parseTest.js";
import { jsonToUrlencoded } from "src/utils/jsonToUrlencoded.js";
const TEST_PATH = "./data/tests/";
const TEST_RESULT_PATH = "https://gila.cf/mvp/test";

async function getTest(testSlug, isAnswers = false ){
  const URL = TEST_PATH + testSlug + ".json";
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(response.status);
  }

  let data = await response.json();
  let test = parseTestContext(data); 

  if (!isAnswers) {
    test = deleteAnswersFromTest(test);
  }
  
  return test;
};

async function addTestResult(results, login){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  const data = { 
    testId: +new Date(),
    date: new Date().toString(),
    login,
    ...results 
  };
  
  const urlencoded = jsonToUrlencoded(data);

  const requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: myHeaders,
    body: urlencoded
  };

  const response = await fetch(TEST_RESULT_PATH, requestOptions);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const result = await response.text();
  return result;
};


export {
  getTest,
  addTestResult
};