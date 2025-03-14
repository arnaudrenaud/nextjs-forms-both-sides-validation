import { z } from "zod";

export const exampleActionSchema = z.object({
  email: z.string().email(),
});
