import { createPersistStore } from "src/utils/persistStore.js";
import { get } from "svelte/store";
import { completedTests } from "src/stores/testStore.js";

const answersStore = createPersistStore("app-answers", {});

const initAnswersStore = (title, lesson, state) => {  
  const stored = get(answersStore);
    
  if (stored.title === title && stored.lesson === lesson && stored.state === state) {
    console.log("Same answers store was init before");
    return;
  }

  console.log("Init new answers store");

  if (state === "completed") {    
    const completed = get(completedTests);     
    const answeredTest = completed[lesson].filter(test => test.title === title)[0];
    answersStore.set({...answeredTest, state});
  } else {
    answersStore.set({ title, lesson, state });
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

const clearAnswersStore = () => {
  answersStore.set({});
};

export { 
  answersStore,
  initAnswersStore,
  addAnswerToAnswersStore,
  clearAnswersStore
};