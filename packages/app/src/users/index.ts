import { createRouter, Response } from "fets";
import { z } from "zod";
import { prisma, temporal } from "../lib/index.js";
import { registerUser } from "./workflows.js";

export default createRouter({ base: "/users" })
  .route({
    method: "GET",
    path: "/register",
    schemas: {
      request: {
        query: z.object({ email: z.string().email() }),
      },
    } as const,
    async handler(request) {
      const email = request.parsedUrl.searchParams.get("email");

      // Create a user account
      const user = await prisma.user.upsert({
        where: { email },
        create: { email },
        update: {},
      });

      if (user.confirmed)
        return Response.json({ welcome: "You're already registered!" });

      // Send a confirmation email
      await temporal.workflow.start(registerUser, {
        args: [email],
        taskQueue: "app",
        workflowId: email,
      });

      return Response.json({ welcome: "Check your emails!" });
    },
  })
  .route({
    method: "GET",
    path: "/confirm",
    schemas: {
      request: {
        query: z.object({ email: z.string().email() }),
      },
    } as const,
    async handler(request) {
      const email = request.parsedUrl.searchParams.get("email");
      await prisma.user.update({ where: { email }, data: { confirmed: true } });
      return Response.json({ confirmed: true });
    },
  })
  .route({
    method: "GET",
    path: "/users",
    schemas: {} as const,
    async handler() {
      return Response.json(
        await prisma.user.findMany({ select: { email: true, confirmed: true } })
      );
    },
  });
