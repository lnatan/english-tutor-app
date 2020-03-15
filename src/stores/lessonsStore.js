import { createPersistStore } from "src/utils/persist-store.js";

export const activeLessons = createPersistStore("app-lessons-active", {});
export const completedLessons = createPersistStore("app-lessons-completed", {});