import { createPersistStore } from "src/utils/persistStore.js"

export const userStore = createPersistStore("app-user");
export const updateUserStore = (updates) => userStore.set(updates);
