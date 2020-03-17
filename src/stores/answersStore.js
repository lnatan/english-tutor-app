import { createPersistStore } from "src/utils/persist-store.js";
import { get } from "svelte/store";

const answersStore = createPersistStore("app-test-answers", {});
// const answersStore = createPersistStore("app-answers", {});

const addAnswer = ([question, variant]) => {
  answersStore.update((store) => {
    return  {
      ...store,
      [question]: variant
    }
  }); 
};

const setAnswersStore = (testId, lesson) => {
  const stored = get(answersStore);

  if (stored.testId !== testId){
    answersStore.set({ testId, lesson });
  }
};

const clearAnswersStore = () => {
  answersStore.set({});
};

const getNotAnswered = (questionsCount) => {
  if (questionsCount === undefined) {
    console.error("`questionsCount` is not defined");
    return;
  }

  const stored = get(answersStore);
  const notAnswered = [];

  const findNotAnswered = (question) => {
    if (question === questionsCount) {
      return notAnswered;
    }
    if (!stored.hasOwnProperty(question)) {
      notAnswered.push(question);
    }
    return findNotAnswered(question + 1);
  };

  return findNotAnswered(0);
};

export { 
  answersStore,
  addAnswer,
  clearAnswersStore,
  setAnswersStore,  
  getNotAnswered   
};