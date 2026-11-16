import Image from 'next/image'

interface Partner {
  name: string
  logo: string
}

export default function Partners({ partners }: { partners: Partner[] }) {
  if (!partners || partners.length === 0) return null

  return (
    <section className="py-16 bg-surface border-y border-border-light">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-2xl text-center mb-10">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, i) => (
            <div key={i} className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain h-12 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
