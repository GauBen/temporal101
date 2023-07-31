import { proxyActivities } from "@temporalio/workflow";
import type { Activities } from "@temporal101/activities";

const { sendConfirmationEmail } = proxyActivities<Activities>({
  startToCloseTimeout: "1 minute",
});

export const registerUser = async (email: string) => {
  await sendConfirmationEmail(email);
};
