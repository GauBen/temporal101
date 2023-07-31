import * as nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  url: process.env["SMTP_URL"],
});
