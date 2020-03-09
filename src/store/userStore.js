import { writable } from "svelte/store";

const userName = writable();
const userLogin = writable();

export { userName, userLogin };