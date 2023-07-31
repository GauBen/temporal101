import { PrismaClient } from "@prisma/client";
import { createRouter, Response } from "fets";
import { createServer } from "node:http";
import { z } from "zod";
import { mailer } from "./mailer.js";

const prisma = new PrismaClient();

const router = createRouter()
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
      await prisma.user.create({ data: { email } });

      // Send a confirmation email
      const url = new URL("http://localhost:3000/confirm");
      url.searchParams.set("email", email);
      await mailer.sendMail({
        from: "support@example.com",
        to: email,
        subject: "Welcome!",
        html: /* HTML */ `<h1>Welcome!</h1>
          <p><a href="${url}">Confirm your email</a></p>`,
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

createServer(router).listen(3000, () => {
  console.log("Server ready on localhost:3000");
});
