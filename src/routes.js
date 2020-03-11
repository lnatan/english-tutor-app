import { wrap } from "svelte-spa-router"; 
import Lesson from "./components/Lesson/index.svelte";
import Questions from "components/Questions/index.svelte";
import Login from "./routes/Login.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  "/": Login,
  "/:lesson": Lesson,
  "/:lesson/:test": Questions,
  "*": NotFound
};

export default routes;