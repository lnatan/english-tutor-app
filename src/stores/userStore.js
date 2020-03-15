import { createPersistStore, deletePersistStore } from "src/utils/persist-store.js";

export const userStore = createPersistStore("app-user");
export const deleteUserStore = () => deletePersistStore("app-user");
