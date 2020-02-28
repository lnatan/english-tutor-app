import Index from "./routes/Index.svelte";
import Lesson from "./routes/Lesson/index.svelte";
import Questions from "components/Questions/index.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  "/": Index,
  "/:lesson": Lesson,
  "/:lesson/:test": Questions,
  "*": NotFound
};

export default routes;
