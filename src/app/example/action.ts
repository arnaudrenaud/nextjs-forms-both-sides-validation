"use server";

import { schema } from "@/app/example/schema";
import { makeServerAction } from "@/lib/server/makeServerAction";

export const action = makeServerAction(schema, async ({ email }) => {
  console.log(`Processing form on the server with email "${email}"…`);

  return { message: `Processed ${email} successfully.` };
});
