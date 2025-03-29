"use server";

import { schema } from "@/app/example/schema";
import { makeServerAction } from "@/lib/server/makeServerAction";
// import { Exception } from "@/lib/exception/Exception";

export const action = makeServerAction(schema, async ({ email }) => {
  console.log(`Processing form on the server with email "${email}"…`);

  // throw new Error("Some unexpected error.");
  // throw new Exception("Specific exception message.");
  return { message: `Processed ${email} successfully.` };
});
