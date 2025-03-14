"use server";

import { exampleActionSchema } from "@/app/exampleAction/exampleActionSchema";
import { makeServerAction } from "@/lib/server/makeServerAction";

export const exampleAction = makeServerAction(
  exampleActionSchema,
  async ({ email }) => {
    console.log(`Processing form with email "${email}"…`);

    return { message: `Processed ${email} successfully.` };
  }
);
