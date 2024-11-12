import { Link } from "react-router-dom"
import { Facebook, Instagram, Mail, Phone,  Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brown-900 text-amber-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* User Area */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">User Area</h2>
            <ul className="space-y-2">
              <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-white transition-colors">Cancellation and Refund</Link></li>
              <li><Link href="/reviews" className="hover:text-white transition-colors">Review & Suggestions</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link href="/wedding" className="hover:text-white transition-colors">Wedding Invitations</Link></li>
              <li><Link href="/party" className="hover:text-white transition-colors">Party Invitations</Link></li>
              <li><Link href="/pooja" className="hover:text-white transition-colors">Pooja & Rituals</Link></li>
              <li><Link href="/signages" className="hover:text-white transition-colors">Welcome Signages</Link></li>
              <li><Link href="/announcement" className="hover:text-white transition-colors">Announcement</Link></li>
              <li><Link href="/theme" className="hover:text-white transition-colors">Theme Invitations</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/printables" className="hover:text-white transition-colors">Free Printables</Link></li>
            </ul>
          </div>

          {/* Join E-nyouta */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Join E-nyouta</h2>
            <ul className="space-y-2">
              <li><Link href="/vendor" className="hover:text-white transition-colors">Register As Vendor</Link></li>
              <li><Link href="/memories" className="hover:text-white transition-colors">Share Memories</Link></li>
              <li><Link href="/matrimonial" className="hover:text-white transition-colors">Submit Matrimonial Biodata</Link></li>
              <li><Link href="/design" className="hover:text-white transition-colors">Submit Design ! Earn</Link></li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-white">Be Social & Stay Connected</h2>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="Pinterest">
                p
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="Telegram">
               T
              </Link>
              <Link href="#" className="hover:text-white transition-colors" aria-label="WhatsApp">
                w
              </Link>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@enyouta.com" className="hover:text-white transition-colors">
                  E-mail Us: info@enyouta.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <a href="tel:+919549541111" className="hover:text-white transition-colors">
                  WhatsApp: +91-954-954-1111
                </a>
              </div>
              <div className="text-sm">
                <p>{ "Monday to Saturday 10am-5pm IST }" }</p>
                <p>Closed all Sunday & holidays</p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Newsletter</h2>
                <form className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email*"
                    className="w-full px-4 py-2 rounded bg-white/10 border border-amber-200/20 focus:outline-none focus:border-amber-200 text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 rounded bg-amber-200 text-brown-900 hover:bg-amber-300 transition-colors font-semibold"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}