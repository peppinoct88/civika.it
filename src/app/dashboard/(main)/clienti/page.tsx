import { redirect } from "next/navigation";

import { resolveActiveCliente } from "@/lib/active-cliente";

export default async function ClientiIndexPage() {
  const state = await resolveActiveCliente();
  if (state.ok) {
    redirect(`/dashboard/clienti/${state.active.id}`);
  }
  redirect("/dashboard");
}
