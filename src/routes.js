// Routes
import Hello from "./routes/Hello.svelte";
import Reading from "./routes/Reading/index.svelte";
import Task from "./routes/Reading/[task].svelte";
import Index from "./routes/Index.svelte";
import NotFound from "./routes/NotFound.svelte";
import Home from "./routes/Home.svelte";

const routes = {
  "/": Index,
  // Using named parameters, with last being optional
  "/home": Home,
  "/hello": Hello,
  "/hello/:first/:last?": Hello,
  "/reading": Reading,
  "/reading/:task": Task,
  // Catch-all, must be last
  "*": NotFound
};

export default routes;
