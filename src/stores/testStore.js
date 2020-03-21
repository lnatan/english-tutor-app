import { createPersistStore } from "src/utils/persistStore.js";
import { get } from "svelte/store";

const activeTests = createPersistStore("app-tests-active", {});
const completedTests = createPersistStore("app-tests-completed", {});

const updateActiveTests = (updates) => activeTests.set(updates);
const updateCompletedTests = (updates) => completedTests.set(updates);

const clearTestStore = () => {
  activeTests.set({});
  completedTests.set({});
};

const isTestStoreEmpty = () => {
  const completedValue = get(completedTests);
  const activeValue = get(activeTests);
  
  return JSON.stringify(completedValue) === JSON.stringify({}) &&
    JSON.stringify(activeValue) === JSON.stringify({});
};

export {
  activeTests,
  completedTests,
  updateActiveTests,
  updateCompletedTests,
  clearTestStore,
  isTestStoreEmpty
};