import { createPersistStore, isStoreEmpty } from "src/utils/persistStore.js"

const activeLessons = createPersistStore("app-lessons-active", {});

const completedLessons = createPersistStore("app-lessons-completed", {});

const updateActiveLessons = (updates) => activeLessons.set(updates);

const updateCompletedLessons = (updates) => completedLessons.set(updates);

const isLessonsStoreEmpty = () => isStoreEmpty("app-lessons-completed");

export {
  activeLessons,
  completedLessons,
  updateActiveLessons,
  updateCompletedLessons,
  isLessonsStoreEmpty
};