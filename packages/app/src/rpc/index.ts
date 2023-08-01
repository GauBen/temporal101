import { createRouter, Response } from "fets";
import { z } from "zod";
import { temporal } from "../lib/index.js";

export default createRouter({ base: "/rpc" }).route({
  method: "GET",
  path: "/hello",
  schemas: {
    request: {
      query: z.object({ name: z.string() }),
    },
  } as const,
  async handler(request) {
    const name = request.parsedUrl.searchParams.get("name");

    const handle = await temporal.workflow.start("SayHello", {
      args: [name],
      taskQueue: "hello-task-queue",
      workflowId: `SayHello-${name}`,
    });

    const result = await handle.result();
    return new Response(result);
  },
});
