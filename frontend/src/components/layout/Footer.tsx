import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Linkedin, Dribbble } from 'lucide-react'

const ABOUT_LINKS = ['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy']
const RESOURCE_LINKS = ['Help Docs', 'Guide', 'Updates', 'Contact Us']

export default function Footer() {
  return (
    <footer className="bg-[#202430] text-gray-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[125px] py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/quickhireLogo.png"
                alt="QuickHire Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-black text-white font-logo">QuickHire</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div className="lg:text-center">
            <h4 className="text-white font-semibold mb-5">About</h4>
            <ul className="space-y-4">
              {ABOUT_LINKS.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:text-center">
            <h4 className="text-white font-semibold mb-5">Resources</h4>
            <ul className="space-y-4">
              {RESOURCE_LINKS.map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-2">Get job notifications</h4>
            <p className="text-sm text-gray-400 mb-5">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 min-w-0 bg-[#1E2128] text-white text-sm px-4 py-3 border border-gray-700 outline-none focus:border-primary-500 placeholder:text-gray-500 transition-colors"
              />
              <button className="bg-primary-500 text-white px-5 py-3 text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-whitegray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">2021 @ QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Dribbble, Linkedin, Twitter].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-9 h-9 bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}