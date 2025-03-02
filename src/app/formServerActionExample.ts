"use server";

import { makeServerAction } from "@/app/makeServerAction";
import { z } from "zod";

export const formServerActionExample = makeServerAction(
  z.object({
    email: z.string().email(),
  }),
  async ({ email }) => {
    console.log(`Form submitted with email: ${email}.`);
  }
);
