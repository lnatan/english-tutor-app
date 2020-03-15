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

export { 
  answersStore,
  initAnswersStore,
  addAnswer 
};