import Lessons from "./components/Lessons/index.svelte";
import Questions from "components/Questions/index.svelte";
import Login from "./routes/Login.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  "/": Login,
  "/:lesson": Lessons,
  "/:lesson/:state": Lessons,
  "/:lesson/:state/:test": Questions,
  "*": NotFound
};

export default routes;