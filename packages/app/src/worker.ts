import { Worker } from "@temporalio/worker";
import { createRequire } from "node:module";
import * as activities from "./activities.js";

const require = createRequire(import.meta.url);

const worker = await Worker.create({
  workflowsPath: require.resolve("./workflows.js"),
  taskQueue: "app",
  activities,
});

await worker.run();
