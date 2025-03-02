import { ZodSchema } from "zod";
import { createServerAction } from "zsa";

/**
 * Provides a server action ready to use in:
 * - `useServerAction` (`src/lib/react/hooks/useServerAction.tsx`)
 * - or `useFormServerAction` (`src/lib/react/hooks/useFormServerAction.tsx`)
 *
 * @param inputSchema the Zod form schema.
 * @param handler a server action that expects data of the same schema.
 *
 * @returns a type-safe action with server-side error handling, and also the input schema.
 */
export function makeServerAction<Input, ReturnValue>(
  inputSchema: ZodSchema<Input>,
  handler: (input: Input) => Promise<ReturnValue>
) {
  return createServerAction()
    .input(inputSchema)
    .handler(async ({ input }) => handler(input));
}
