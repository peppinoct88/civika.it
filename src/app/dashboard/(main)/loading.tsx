/**
 * Skeleton SSR mostrato da Next.js mentre il Server Component
 * `page.tsx` aspetta `getCockpitInbox()` / `resolveActiveCliente()`.
 * Evita la pagina bianca durante eventuali cold-start del tunnel
 * Cloudflare → api.civika.it.
 */

export default function DashboardLoading() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="h-7 w-48 animate-pulse rounded-md bg-[#1B3A5C]/40" />
            <div className="h-4 w-72 animate-pulse rounded-md bg-[#1B3A5C]/30" />
          </div>
          <div className="h-3 w-24 animate-pulse rounded-md bg-[#1B3A5C]/30" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonSection key={i} />
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-6">
        <div className="overflow-hidden rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 p-4 backdrop-blur-sm">
          <div className="mb-3 h-3 w-20 animate-pulse rounded bg-[#1B3A5C]/40" />
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded-lg bg-[#1B3A5C]/25"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonSection() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#1B3A5C]/30 bg-[#0F1F33]/60 p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-4 w-4 animate-pulse rounded bg-[#1B3A5C]/40" />
        <div className="h-4 w-32 animate-pulse rounded bg-[#1B3A5C]/40" />
      </div>
      <div className="space-y-3">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-xl bg-[#1B3A5C]/25"
          />
        ))}
      </div>
    </div>
  );
}
