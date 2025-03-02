"use client";

import { formServerActionExample } from "@/app/formServerActionExample";
import { useFormServerAction } from "@/app/useFormServerAction";

export default function FormExample() {
  const { form, submit } = useFormServerAction(formServerActionExample);

  return (
    <form onSubmit={submit}>
      <input type="email" {...form.register("email")} />
    </form>
  );
}
