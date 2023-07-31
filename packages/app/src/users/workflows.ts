import { proxyActivities, sleep } from "@temporalio/workflow";
import type * as activities from "./activities.js";

const { sendConfirmationEmail, isEmailConfirmed } = proxyActivities<
  typeof activities
>({ startToCloseTimeout: "1 minute" });

export const registerUser = async (email: string) => {
  await sendConfirmationEmail(email);

  await sleep("1 minute");

  if (await isEmailConfirmed(email)) return;
  await sendConfirmationEmail(email);

  await sleep("2 minute");

  if (await isEmailConfirmed(email)) return;
  await sendConfirmationEmail(email);
};
