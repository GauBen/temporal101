import { mailer, prisma } from "../lib/index.js";

export const sendConfirmationEmail = async (email: string) => {
  const url = new URL("http://localhost:3000/users/confirm");
  url.searchParams.set("email", email);
  return mailer.sendMail({
    from: "support@example.com",
    to: email,
    subject: "Welcome!",
    html: /* HTML */ `<h1>Welcome!</h1>
      <p><a href="${url}">Confirm your email</a></p>`,
  });
};

export const isEmailConfirmed = async (email: string) => {
  const { confirmed } = await prisma.user.findUnique({
    where: { email },
  });
  return confirmed;
};
