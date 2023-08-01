import { createRouter } from "fets";
import { createServer } from "node:http";
import rpc from "./rpc/index.js";
import users from "./users/index.js";

const router = createRouter()
  .route({
    path: "/rpc/*",
    handler: rpc,
  })
  .route({
    path: "/users/*",
    handler: users,
  });

createServer(router).listen(3000, () => {
  console.log("Server ready on localhost:3000");
});
