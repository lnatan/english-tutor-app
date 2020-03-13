import createPersistStore from "src/utils/persist-store.js";

export const activeLessons = createPersistStore("app-lesson-active", "");
export const completedLessons = createPersistStore("app-lesson-completed", "");