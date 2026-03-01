import Image from 'next/image'

const COMPANIES = [
  { name: 'Vodafone', logo: '/company-logos/vodafone.png' },
  { name: 'Intel',    logo: '/company-logos/intel.png'    },
  { name: 'Tesla',    logo: '/company-logos/tesla.png'    },
  { name: 'AMD',      logo: '/company-logos/amd.png'      },
  { name: 'Talkit',   logo: '/company-logos/talkit.png'   },
]

export default function CompanyLogos() {
  return (
    <section className="border-b border-gray-100 py-10 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[125px]">
        <p className="text-sm text-gray-400 mb-7">Companies we helped grow</p>
        <div className="flex flex-wrap items-center gap-10 md:gap-16 justify-between">
          {COMPANIES.map((c) => (
            <div key={c.name} className="relative h-8 w-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <Image
                src={c.logo}
                alt={c.name}
                fill
                className="object-contain object-left"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}