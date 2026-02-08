import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#070E18] px-8 py-12 border-t border-white/[0.04]">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex justify-between items-center flex-wrap gap-5 mb-8">
          <Link href="/" className="flex items-center no-underline">
            <img
              src="/logo-civika-white.svg"
              alt="CIVIKA — Comunicazione Istituzionale per Comuni Siciliani"
              className="h-[28px] w-auto"
            />
          </Link>
          <div className="text-[13px] text-white/30">
            La Regia per Eventi e Comunicazione Istituzionale
          </div>
          <div className="text-xs text-white/20">&copy; CIVIKA SRL 2026</div>
        </div>
        <nav aria-label="Footer navigation" className="flex gap-8 flex-wrap justify-center border-t border-white/[0.06] pt-6">
          {[
            { label: "Home", href: "/" },
            { label: "Chi Siamo", href: "/chi-siamo" },
            { label: "Servizi", href: "/#servizi" },
            { label: "Blog", href: "/blog" },
            { label: "Contatti", href: "/contatti" },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-white/25 no-underline text-xs hover:text-[#D4A03C] transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
