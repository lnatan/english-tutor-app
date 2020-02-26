import Index from "./routes/Index.svelte";
// import Hometasks from "./routes/Hometask/index.svelte";
import Lesson from "./routes/Lesson/index.svelte";
import Test from "./routes/Lesson/[test].svelte";
import NotFound from "./routes/NotFound.svelte";
import Activities from "./routes/[Activities]/index.svelte";

const routes = {
  "/": Index,
  "/:activities": Activities,
  "/:activities/:test": Test,
  // "/hometask/": Hometasks,
  // "/hometask/:name": Hometasks,
  // "/lesson/": Lesson,
  // "/reading/": Reading,
  // "/reading/:quiz": Quiz,
  // Catch-all, must be last
  "*": NotFound
};

export default routes;
