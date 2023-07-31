import type { PrismaClient } from "@prisma/client";
import type { Transporter } from "nodemailer";

interface Context {
  mailer: Transporter;
  prisma: PrismaClient;
}

export const createActivities = ({ mailer, prisma }: Context) => ({
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
  async isEmailConfirmed(email: string) {
    const { confirmed } = await prisma.user.findUnique({
      where: { email },
    });
    return confirmed;
  },
});

export type Activities = ReturnType<typeof createActivities>;
