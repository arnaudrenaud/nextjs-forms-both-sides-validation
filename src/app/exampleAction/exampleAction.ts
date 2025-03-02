"use server";

import { exampleActionSchema } from "@/app/exampleAction/exampleActionSchema";
import { makeServerAction } from "@/lib/server/makeServerAction";

export const exampleAction = makeServerAction(
  exampleActionSchema,
  async ({ email }) => {
    console.log(`✅ Form submitted with email address: ${email}.`);

    return "Server action executed successfully.";
  }
);
