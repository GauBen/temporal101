import { PrismaClient } from "@prisma/client";
import { createActivities } from "@temporal101/activities";
import { Worker } from "@temporalio/worker";
import { createRequire } from "node:module";
import { mailer } from "./mailer.js";

const require = createRequire(import.meta.url);

const worker = await Worker.create({
  workflowsPath: require.resolve("@temporal101/workflows"),
  taskQueue: "app",
  activities: createActivities({
    prisma: new PrismaClient(),
    mailer,
  }),
});

await worker.run();
