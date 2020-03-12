// import { writable, get } from "svelte-persistent-store/local";

import createPersistStore from "src/utils/persist-store.js";
import { get } from "svelte/store";

const testStore = createPersistStore("app-test","");
const answersStore = createPersistStore("app-answer","{}");

const addAnswer = ([question, variant]) => {
  if (typeof variant === "object") {
    variant = JSON.stringify([...variant]);
  }

  answersStore.update((store) => {
    store = JSON.parse(store);
    const newStore = JSON.stringify({
      ...store,
      [question]: variant
    });
    return newStore;
  }); 
};

const getAnswers = () => {
  let store = get(answersStore);
  store = JSON.parse(store);
  const mapStore = new Map();
  
  for (let key in store) {
    key = parseInt(key);
    mapStore.set(key, store[key]);
  }
  console.log(mapStore);
  return mapStore;
  
};

export { testStore, answersStore, addAnswer, getAnswers };