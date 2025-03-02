"use client";

import { exampleAction } from "@/app/exampleAction/exampleAction";
import { exampleActionSchema } from "@/app/exampleAction/exampleActionSchema";
import { useFormServerAction } from "@/lib/browser/useFormServerAction";

export default function ExampleForm() {
  const { form, submit } = useFormServerAction(
    exampleActionSchema,
    exampleAction
  );

  return (
    <form onSubmit={submit}>
      <label>
        Email address:
        <input type="email" {...form.register("email")} />
      </label>
      <button>Submit</button>
    </form>
  );
}
