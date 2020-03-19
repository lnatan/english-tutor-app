import { createPersistStore, isStoreEmpty } from "src/utils/persistStore.js"

export const activeLessons = createPersistStore("app-lessons-active", {});
export const completedLessons = createPersistStore("app-lessons-completed", {});
export const isLessonsStoreEmpty = () => {
  return isStoreEmpty("app-lessons-completed");
};
