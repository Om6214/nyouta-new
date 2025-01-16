import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-amber-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Area */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">User Area</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/reviews"
                  className="hover:text-white transition-colors"
                >
                  Review & Suggestions
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/products" className="hover:text-white transition-colors">Wedding Invitations</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Party Invitations</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Pooja & Rituals</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Welcome Signages</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Announcement</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Theme Invitations</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/printables" className="hover:text-white transition-colors">Free Printables</a></li>
            </ul>
          </div> */}

          {/* Join E-nyouta */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Join Nyouta
            </h2>
            <ul className="space-y-2">
              <li>
                <Link
                  className="hover:text-white transition-colors"
                  to={`/join-e-nyouta`}
                >
                  Submit form to join
                </Link>
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-white">
              Be Social & Stay Connected
            </h2>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/nyoutastores"
                target="_blank"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/Nyoutastore"
                target="_blank"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@nyoutastore"
                target="_blank"
                className="hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/nyoutastore/"
                target="_blank"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Contact Us
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:info@enyouta.com"
                  className="hover:text-white transition-colors"
                >
                  info@enyouta.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <a
                  href="tel:+919549541111"
                  className="hover:text-white transition-colors"
                >
                  +91-954-954-1111
                </a>
              </div>
              <div className="text-sm">
                <p>{"Monday to Saturday 10am-5pm IST"}</p>
                <p>Closed all Sunday & holidays</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
