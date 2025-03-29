"use client";

import { useFormServerAction } from "@/lib/browser/useFormServerAction";
import { schema } from "@/app/example/schema";
import { action } from "@/app/example/action";

export function Form() {
  const {
    form,
    fieldErrors,
    submit,
    action: { isExecuting, result },
  } = useFormServerAction(schema, action);

  return (
    <form onSubmit={submit}>
      <label>
        Email address:
        <input type="email" {...form.register("email")} />
      </label>
      {fieldErrors.email && (
        <div className="text-sm text-red-500">{fieldErrors.email.message}</div>
      )}

      <button disabled={isExecuting}>
        {isExecuting ? "Loading…" : "Submit"}
      </button>

      {result.data && (
        <div className="text-green-500">{result.data.message}</div>
      )}
    </form>
  );
}
