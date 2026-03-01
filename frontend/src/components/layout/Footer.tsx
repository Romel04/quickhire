import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Dribbble } from 'lucide-react'

const ABOUT_LINKS = ['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy']
const RESOURCE_LINKS = ['Help Docs', 'Guide', 'Updates', 'Contact Us']

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                </div>
              </div>
              <span className="text-xl font-black text-white">QuickHire</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-3">
              {ABOUT_LINKS.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-2">Get job notifications</h4>
            <p className="text-sm text-gray-400 mb-4">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 min-w-0 bg-gray-800 text-white text-sm px-4 py-2.5 rounded-lg border border-gray-700 outline-none focus:border-primary-500 placeholder:text-gray-500 transition-colors"
              />
              <button className="bg-primary-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">2024 @ QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Dribbble, Linkedin, Twitter].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-500 transition-colors"
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
