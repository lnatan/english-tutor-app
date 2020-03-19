import { createPersistStore, deletePersistStore } from "src/utils/persistStore.js"

export const userStore = createPersistStore("app-user");
export const deleteUserStore = () => deletePersistStore("app-user");
