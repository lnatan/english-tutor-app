// Routes
import Hello from "./routes/Hello.svelte";
import Home from "./routes/Home.svelte";
import readingMain from "./routes/Reading/Main.svelte";
import readingTest from "./routes/Reading/Test.svelte";
import Profile from "./routes/Profile.svelte";
import NotFound from "./routes/NotFound.svelte";

const routes = {
  "/": Profile,
  // Using named parameters, with last being optional
  "/hello": Hello,
  "/hello/:first/:last?": Hello,
  "/reading": readingMain,
  "/reading/:title": readingTest,
  // Catch-all, must be last
  "*": NotFound
};

export default routes;
