import { useForm, UseFormProps } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import { HookSafeActionFn, useAction } from "next-safe-action/hooks";

export type ServerActionContext = undefined;
type ServerActionError = string;

/**
 * Built on top of {@link https://react-hook-form.com/docs/useform React Hook Form's `useForm`}
 * and {@link https://next-safe-action.dev/docs/execute-actions/hooks/useaction next-safe-action's `useAction`},
 * it provides both form state and action state.
 *
 * @param formSchema the Zod form schema.
 * @param actionOnSubmit a server action that expects data of the same schema (created using `makeServerAction` from `@/lib/server/makeServerAction.ts`).
 * @param options React Hook Form's `useForm` options.
 *
 * @returns an object with:
 * - React Hook Form's `form` object
 * - `formFieldErrors` that map each form field to a potential error
 * - the `submit` function that you can pass to your form's `onSubmit`
 * - the `action` object with its execution state (`isPending`, `data`, `error`, `isError`, `isSuccess`…).
 */
export function useFormServerAction<FormSchema extends z.ZodType, ReturnType>(
  formSchema: FormSchema,
  actionOnSubmit: HookSafeActionFn<
    ServerActionError,
    ZodSchema,
    readonly [],
    {
      _errors?: string[] | undefined;
    },
    readonly [],
    ReturnType
  >,
  options?: UseFormProps<FormSchema>
) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    ...options,
  });

  const action = useAction(actionOnSubmit);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void form.handleSubmit((input) => action.execute(input))(event);
  };

  return {
    form,
    fieldErrors: form.formState.errors,
    submit,
    action,
  };
}
