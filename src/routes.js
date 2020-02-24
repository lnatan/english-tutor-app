// Routes
import Hello from "./routes/Hello.svelte";
import Reading from "./routes/Reading/index.svelte";
import Test from "./routes/Reading/[test].svelte";
import Index from "./routes/Index.svelte";
import NotFound from "./routes/NotFound.svelte";
import Home from "./routes/Home.svelte";

const routes = {
  "/": Index,
  "/home/": Home,
  "/home/:name": Home,
  "/hello": Hello,
  "/hello/:first/:last?": Hello,
  "/lessons/": Reading,
  "/lessons/:test": Test,
  // "/reading/": Reading,
  // "/reading/:quiz": Quiz,
  // Catch-all, must be last
  "*": NotFound
};

export default routes;
