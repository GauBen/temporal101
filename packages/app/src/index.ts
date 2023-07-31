import { createRouter } from "fets";
import { createServer } from "node:http";
import users from "./users/index.js";

const router = createRouter().route({
  path: "/users/*",
  handler: users,
});

createServer(router).listen(3000, () => {
  console.log("Server ready on localhost:3000");
});
