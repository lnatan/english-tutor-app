// Pages
import Hello from "./routes/Hello.svelte";
import Home from "./routes/Home.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  "/": Home,
  // Using named parameters, with last being optional
  "/hello/:first/:last?": Hello,
  // Catch-all, must be last
  "*": NotFound
};

export default routes;
