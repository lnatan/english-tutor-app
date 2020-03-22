import { parseTestContext, deleteAnswersFromTest } from "src/utils/parseTest.js";
import { jsonToUrlencoded } from "src/utils/jsonToUrlencoded.js";
const TEST_PATH = "./data/tests/";
const TEST_RESULT_PATH = "https://gila.cf/mvp/test";
const TEST_RESULT_PATH_BY_USER = "https://gila.cf/mvp/user/";

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
}

async function addTestResult(results, login){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  const data = { 
    testId: +new Date(),
    date: new Date().toDateString(),
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
}

async function getTestResult(login){
  const URL = TEST_RESULT_PATH_BY_USER + login;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch(error) {
    console.log(error);
  }
}


export {
  getTest,
  addTestResult,
  getTestResult
};