import { writable } from 'svelte/store';

function createTestStore() {
	const { subscribe, set, update } = writable({
    active: 0,
    rezults: new Map([])
  });

	return {
		subscribe,
    changeActive: (val) => {
      update((store) => {
        return {
          active: val,
          rezults: store.rezults
        }
      });
    },
		addRezult: () => update(),
		reset: () => set()
	};
}

export const test = createTestStore();