import { parse } from "src/utils/parse.js";
const TEST_PATH = "./data/tests/";
const TEST_RESULT_PATH = "https://gila.cf/mvp/kv";

function deleteAnswersFromTest(test){
  let { questions } = test;
  questions = questions.map(({variants, ...rest}) => {
    const noAnswerVariants = variants.map(({variant, answer}) => { 
      return { variant }
    });

    return {
      variants: noAnswerVariants,
      ...rest
    }
  });
  
  return {
    ...test,
    questions
  }
};

async function getTest(testName, isAnswers = false ){
  const URL = TEST_PATH + testName + ".json";
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(response.status);
  }
  let data = await response.json();
  let test = parse(data); 

  if (!isAnswers) {
    test = deleteAnswersFromTest(test);
  }
  
  return test;
};

  async function addTestResult(testResult, userId){
    const { testId, lesson, ...answers } = testResult;
    const data = {
      id: userId,
      testId,
      lesson,
      answers
    };
    const requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain" },
      mode: "no-cors",
      body: JSON.stringify(data)
    };

    const response = await fetch(TEST_RESULT_PATH, requestOptions);
    if (!response.ok) {
      console.log(response);
      throw new Error("Sending is failed! Try again...");
    }
    const result = await response.text();
    return result;
  };


export {
  getTest,
  addTestResult
};