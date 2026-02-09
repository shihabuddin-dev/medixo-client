import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
      <footer className="glass-footer mt-32">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            <div className="col-span-2 mb-8">
              <span className="text-2xl font-semibold tracking-tight text-white mb-2">
                Medixo
              </span>
              <p className="text-sm text-white/70 max-w-sm leading-relaxed">
                The unified workspace that adapts to how you think and work.
                Built for modern teams who demand excellence.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://github.com/shihabuddin-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <FaGithub className="h-5 w-5" />
                </a>

                <a
                  href="https://x.com/shihab_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <FaXTwitter className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/shihab-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <FaLinkedin className="h-5 w-5" />
                </a>

                <a
                  href="https://www.facebook.com/shihab.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-all duration-200 hover:scale-110"
                >
                  <FaFacebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Integrations
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white mb-4">Solutions</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    For Teams
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    For Startups
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Enterprise
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Education
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Non-profit
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Remote Work
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white mb-4">Resources</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Documentation
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Blog
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Press Kit
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Partners
                  </a>
                </li>
                <li className="">
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Investors
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-md">
                <h4 className="text-lg font-medium text-white mb-2">
                  Stay updated
                </h4>
                <p className="text-sm text-white/70">
                  Get the latest updates, tips, and product announcements
                  delivered to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md w-full lg:w-auto">
                <div className="relative flex-1"></div>

                <button
                  className="
    group inline-flex items-center justify-center gap-2
    rounded-xl px-6 py-3 text-sm font-medium text-white"
                >
                  <span>Subscribe</span>

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 text-sm text-white/60">
                <span>© {new Date().getFullYear()} Medixo Inc.</span>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/teams-of-service"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <span>
                  Develop By{" "}
                  <a
                    href="https://shihab-dev.web.app/"
                    className="hover:text-white transition-colors duration-200"
                    target="_blank"
                  >
                    Shihab uddin
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <div className="flex h-2 w-2">
                  <div className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 animated"></div>
                  <div className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></div>
                </div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
