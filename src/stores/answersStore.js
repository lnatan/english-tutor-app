import { createPersistStore } from "src/utils/persistStore.js"
import { get } from "svelte/store";

const answersStore = createPersistStore("app-answers", {});

const addParamsToAnswersStore = (title, lesson) => {
  const stored = get(answersStore);
  
  if (stored.title !== title){
    answersStore.set({ title, lesson });
  }
};

const addAnswerToAnswersStore = ([questionIndex, variantIndex]) => {
  answersStore.update((store) => {
    return  {
      ...store,
      [questionIndex]: variantIndex
    }
  }); 
};

const getNotAnswered = (questionsCount) => {
  if (questionsCount === undefined) {
    console.error("`questionsCount` is not defined");
    return;
  }

  const stored = get(answersStore);
  const notAnswered = [];

  const findNotAnswered = (questionIndex) => {
    if (questionIndex === questionsCount) {
      return notAnswered;
    }
    if (!stored.hasOwnProperty(questionIndex)) {
      notAnswered.push(questionIndex);
    }
    return findNotAnswered(questionIndex + 1);
  };

  return findNotAnswered(0);
};

const clearAnswersStore = () => {
  answersStore.set({});
};

export { 
  answersStore,
  addParamsToAnswersStore,
  addAnswerToAnswersStore,
  clearAnswersStore,
  getNotAnswered,  
};