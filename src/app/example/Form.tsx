"use client";

import { useFormServerAction } from "@/lib/browser/useFormServerAction";
import { schema } from "@/app/example/schema";
import { action } from "@/app/example/action";

export function Form() {
  const { form, fieldErrors, submit } = useFormServerAction(schema, action);

  return (
    <form onSubmit={submit}>
      <label>
        Email address:
        <input type="email" {...form.register("email")} />
      </label>
      {fieldErrors.email && (
        <div className="text-sm text-red-500">{fieldErrors.email.message}</div>
      )}

      <button>Submit</button>
    </form>
  );
}
