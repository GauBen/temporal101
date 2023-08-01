import { NativeConnection, Worker } from "@temporalio/worker";
import { createRequire } from "node:module";
import * as activities from "./activities.js";

const require = createRequire(import.meta.url);
const connection = await NativeConnection.connect({
  address: process.env["TEMPORAL_URL"],
});

const worker = await Worker.create({
  connection,
  workflowsPath: require.resolve("./workflows.js"),
  taskQueue: "app",
  activities,
});

await worker.run();
