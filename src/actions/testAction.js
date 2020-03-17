import { parse } from "src/utils/parse.js";
const TEST_PATH = "./data/tests/";
const TEST_RESULT_PATH = "https://gila.cf/mvp/test";

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

  async function sendTestResult(testResult, userId){
    const { testId, lesson, ...answers } = testResult;
    const data = {
      userId,
      testId,
      lesson,
      answers
    };
    const requestOptions = {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    const response = await fetch(TEST_RESULT_PATH, requestOptions);

    if (!response.ok) {
      console.log(response);
      throw new Error(response.status);
    }
    
    const result = await response.text();
    console.log(result);
    return result;
  };


export {
  getTest,
  sendTestResult
};