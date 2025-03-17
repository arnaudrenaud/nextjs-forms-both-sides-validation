"use client";

import { useFormServerAction } from "@/lib/browser/useFormServerAction";
import { exampleActionSchema } from "@/app/exampleAction/exampleActionSchema";
import { exampleAction } from "@/app/exampleAction/exampleAction";

export function ExampleForm() {
  const { form, formFieldErrors, submit } = useFormServerAction(
    exampleActionSchema,
    exampleAction
  );

  return (
    <form onSubmit={submit}>
      <label>
        Email address:
        <input type="email" {...form.register("email")} />
      </label>
      {formFieldErrors.email && (
        <div className="text-sm text-red-500">
          {formFieldErrors.email.message}
        </div>
      )}

      <button>Submit</button>
    </form>
  );
}
