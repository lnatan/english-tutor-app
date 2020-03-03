import Index from "./routes/Index.svelte";
import Lesson from "./components/Lesson/index.svelte";
import Questions from "components/Questions/index.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  "/": Index,
  "/:lesson": Lesson,
  "/:lesson/:test": Questions,
  "*": NotFound
};

export default routes;
