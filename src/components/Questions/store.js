import { writable } from 'svelte/store';

const store = writable({
  active: 0,
  answers: []
});

const updateActive = (val) => {
  store.update(old => {
    return {
      ...old,
      active: val     
    }
  });
};

const updateAnswers = (val) => {
  store.update(old => {
    return {
      ...old,
      answers: [...old.answers, [old.active, val]]
    }
  });
};

export { store, updateActive, updateAnswers };