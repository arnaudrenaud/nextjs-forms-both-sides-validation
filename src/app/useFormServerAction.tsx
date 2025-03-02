import { useForm, UseFormProps } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { THandlerFunc } from "zsa";
import { FormEvent } from "react";
import { useServerAction } from "zsa-react";

export type ServerActionContext = undefined;

/**
 * Built on top of {@link https://react-hook-form.com/docs/useform React Hook Form's `useForm`}
 * and {@link https://zsa.vercel.app/docs/use-server-action ZSA's `useServerAction`},
 * it provides both form state and action state.
 *
 * @param formSchema the Zod form schema.
 * @param actionOnSubmit a server action that expects data of the same schema (created using `serverAction` from `@/lib/server-actions/server-actions`).
 * @param options React Hook Form's `useForm` options.
 *
 * @returns an object with:
 * - React Hook Form's `form` object
 * - `formFieldErrors` that map each form field to a potential error
 * - the `submit` function that you can pass to your form's `onSubmit`
 * - the `action` object with its execution state (`isPending`, `data`, `error`, `isError`, `isSuccess`…).
 */
export function useFormServerAction<
  InputSchemaType extends z.ZodType,
  ReturnType
>(
  actionOnSubmit: {
    inputSchema: InputSchemaType;
    action: THandlerFunc<
      ZodSchema,
      undefined,
      "ShapeErrorNotSet",
      Promise<ReturnType>,
      ServerActionContext,
      "json",
      false
    >;
  },
  options?: UseFormProps<InputSchemaType>
) {
  const { action, inputSchema } = actionOnSubmit;

  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    ...options,
  });

  const executableAction = useServerAction(action);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void form.handleSubmit((input) => executableAction.execute(input))(event);
  };

  return {
    form,
    formFieldErrors: form.formState.errors,
    submit,
    action,
  };
}
