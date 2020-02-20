// Pages
import Hello from "./routes/Hello.svelte";
import Home from "./routes/Home.svelte";
import Quiz from "./routes/Quiz.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  "/": Home,
  // Using named parameters, with last being optional
  "/hello": Hello,
  "/hello/:first/:last?": Hello,
  "/quiz": Quiz,
  "/quiz/:title": Quiz,
  // Catch-all, must be last
  "*": NotFound
};

export default routes;
