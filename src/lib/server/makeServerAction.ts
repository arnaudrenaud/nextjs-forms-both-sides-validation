import { ZodSchema } from "zod";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { Exception } from "@/lib/exception/Exception";

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
  return createSafeActionClient({
    handleServerError(error) {
      const isException = error instanceof Exception;

      console.error(
        `${isException ? "⚠️ Action exception" : "❌ Action error"}: ${
          error.message
        }`
      );

      if (isException) {
        return error.message;
      }

      return DEFAULT_SERVER_ERROR_MESSAGE;
    },
  })
    .schema(inputSchema)
    .action(async ({ parsedInput }) => handler(parsedInput));
}
