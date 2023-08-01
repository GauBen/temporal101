import { Client, Connection } from "@temporalio/client";

const connection = await Connection.connect({
  address: process.env["TEMPORAL_URL"],
});

export const temporal = new Client({ connection });
