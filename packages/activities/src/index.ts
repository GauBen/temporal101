import type { PrismaClient } from "@prisma/client";
import type { Transporter } from "nodemailer";

interface Context {
  prisma: PrismaClient;
  mailer: Transporter;
}

export const createActivities = ({ mailer }: Context) => ({
  async sendConfirmationEmail(email: string) {
    const url = new URL("http://localhost:3000/confirm");
    url.searchParams.set("email", email);
    return mailer.sendMail({
      from: "support@example.com",
      to: email,
      subject: "Welcome!",
      html: /* HTML */ `<h1>Welcome!</h1>
        <p><a href="${url}">Confirm your email</a></p>`,
    });
  },
});

export type Activities = ReturnType<typeof createActivities>;
