import { parse } from "src/utils/parse.js";
const TEST_PATH = "./data/tests/";

async function getTest(testName, isAnswers = false ){
  const URL = TEST_PATH + testName + ".json";
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error(res.status);
  }
  let data = await res.json();
  let test = parse(data); 

  if (!isAnswers) {
    test = deleteTestAnswers(test);
  }
  
  return test;
};

function deleteTestAnswers(test){
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


export {
  getTest
};