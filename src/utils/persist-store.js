import { writable } from "svelte/store";

const createPersistStore = (name, value) => {
  const store = localStorage.getItem(name);
  value = writable(!store ? value : JSON.parse(store));
  value.subscribe(value => {
    if (value !== undefined) {
      localStorage.setItem(name, JSON.stringify(value));
    }
  })
  return value;
}

export default createPersistStore;