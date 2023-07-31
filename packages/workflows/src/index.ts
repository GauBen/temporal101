import { condition, proxyActivities, sleep } from "@temporalio/workflow";
import type { Activities } from "@temporal101/activities";

const { sendConfirmationEmail, isEmailConfirmed } = proxyActivities<Activities>(
  { startToCloseTimeout: "1 minute" }
);

export const registerUser = async (email: string) => {
  await sendConfirmationEmail(email);

  await sleep("1 minute");

  if (await isEmailConfirmed(email)) return;
  await sendConfirmationEmail(email);

  await sleep("2 minute");

  if (await isEmailConfirmed(email)) return;
  await sendConfirmationEmail(email);
};
