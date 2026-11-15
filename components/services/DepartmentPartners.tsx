import Image from "next/image";

const partners = [
  { name: "British Columbia", logo: "/images/partners/british_columbia.jpeg" },
  { name: "Carrier", logo: "/images/partners/carrier.png" },
  { name: "EcoLog", logo: "/images/partners/ecolog.png" },
  { name: "Parker", logo: "/images/partners/parker.jpeg" },
  { name: "Webasto", logo: "/images/partners/webasto.png" },
  { name: "ExTe", logo: "/images/partners/exte.jpg" },
  { name: "Grote", logo: "/images/partners/grote.jpg" },
];

export function DepartmentPartners() {
  return (
    <section className="border-y bg-muted/30 py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Industry partners
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Supported by established manufacturers and suppliers
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Munden works with leading equipment, parts, and systems partners
              to support commercial trucks, trailers, and equipment.
            </p>
          </div>

          <ul
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7"
            aria-label="Munden industry partners"
          >
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex min-h-24 items-center justify-center rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="relative h-14 w-full">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 120px"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
