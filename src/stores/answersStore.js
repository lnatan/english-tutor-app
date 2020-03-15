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

const initAnswersStore = (testId, lesson) => {
  const stored = get(answersStore);

  if (stored.testId !== testId){
    answersStore.set({ testId, lesson });
  }
};

const getNotAnswered = (questionsCount) => {
  const stored = get(answersStore);
  const notAnswered = [];

  const findNoAnswered = (question) => {
    if (question === questionsCount) {
      return notAnswered;
    }
    if (!stored.hasOwnProperty(question)) {
      notAnswered.push(question);
    }

    return findNoAnswered(question + 1);
  };

  return findNoAnswered(0);
};

export { 
  answersStore,
  initAnswersStore,
  getNotAnswered,
  addAnswer 
};