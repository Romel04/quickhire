import Image from "next/image";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-[125px]">
        <style>{`
          @media (min-width: 768px) {
            .cta-banner {
              clip-path: polygon(100px 0%, 100% 0%, 100% calc(100% - 100px), calc(100% - 100px) 100%, 0% 100%, 0% 100px);
            }
          }
        `}</style>

        <div className="cta-banner bg-primary-500 relative overflow-visible md:min-h-[350px] flex items-center rounded-none">
          {/* Left — text + button */}
          <div className="relative z-10 px-12 py-12 flex flex-col gap-5 max-w-[420px]">
            <div>
              <h2 className="font-heading text-4xl font-bold text-white leading-tight mb-3">
                Start posting
                <br />
                jobs today
              </h2>
              <p className="text-blue-200 text-sm">
                Start posting jobs for only $10.
              </p>
            </div>
            <Link
              href="/admin"
              className="border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-primary-500 transition-colors whitespace-nowrap self-start"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Dashboard image */}
          <div className="hidden lg:block absolute right-[60px] top-[40px] w-[42%] h-full z-20">
            <Image
              src="/dashboard-preview.png"
              alt="QuickHire dashboard"
              fill
              className="object-contain object-left-top drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
