import { createServer } from "node:http";
import { createRouter, Response } from "fets";
import { z } from "zod";
import { mailer } from "./mailer.js";

const router = createRouter().route({
  method: "GET",
  path: "/register",
  schemas: {
    request: {
      query: z.object({ email: z.string().email() }),
    },
  } as const,
  handler(request) {
    const email = request.parsedUrl.searchParams.get("email");
    mailer.sendMail({
      from: "support@example.com",
      to: email,
      subject: "Welcome!",
      html: "<h1>Welcome to our app!</h1>",
    });
    return Response.json({ welcome: "Check your emails!" });
  },
});

createServer(router).listen(3000, () => {
  console.log("Server ready on localhost:3000");
});
