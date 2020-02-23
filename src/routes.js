// Routes
import Hello from "./routes/Hello.svelte";
import Reading from "./routes/Reading/index.svelte";
import Task from "./routes/Reading/[task].svelte";
import Profile from "./routes/Profile.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  "/": Profile,
  // Using named parameters, with last being optional
  "/hello": Hello,
  "/hello/:first/:last?": Hello,
  "/reading": Reading,
  "/reading/:task": Task,
  // Catch-all, must be last
  "*": NotFound
};

export default routes;
