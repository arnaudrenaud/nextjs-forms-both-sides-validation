import { ZodSchema } from "zod";
import { createSafeActionClient } from "next-safe-action";

/**
 * Provides a server action ready to use in `useFormServerAction` (`src/lib/browser/useFormServerAction.tsx`)
 *
 * @param inputSchema a Zod form schema.
 * @param handler a server action that expects data of the same schema.
 *
 * @returns a type-safe action.
 */
export function makeServerAction<Input, ReturnValue>(
  inputSchema: ZodSchema<Input>,
  handler: (input: Input) => Promise<ReturnValue>
) {
  return createSafeActionClient()
    .schema(inputSchema)
    .action(async ({ parsedInput }) => handler(parsedInput));
}
