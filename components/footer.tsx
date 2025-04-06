import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Top Wave SVG - Removed to fix background issues */}
      
      {/* Main Footer Content */}
      <div className="w-full px-4 pb-8 pt-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Logo and description column */}
            <div className="w-full lg:w-1/3 mb-10 lg:mb-0 flex flex-col items-center lg:items-start">
              <Link href="/" className="mb-6 transform transition hover:scale-105">
                <img
                  src="/logo.png"
                  alt="DevHouse Logo"
                  className="h-32 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md text-center lg:text-left mb-6">
                Personalized drug dosage optimization using reinforcement learning
                to transform patient care.
              </p>
              <div className="flex space-x-5">
                <Link
                  href="#"
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link
                  href="#"
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link
                  href="#"
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* Links columns */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b border-blue-200 dark:border-gray-700">
                  Features
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/dosage-ai"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      AI Dosage Optimization
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/drug-database"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      Drug Database
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/chatbot"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      AI Chatbot
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ehr-integration"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      EHR Integration
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b border-blue-200 dark:border-gray-700">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      About Us
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      href="/product"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/how-it-works"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/technology"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      Technology
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4 pb-2 border-b border-blue-200 dark:border-gray-700">
                  Legal
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/compliance"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                    >
                      <span className="mr-2">•</span>
                      Compliance
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="w-full py-6 bg-blue-100/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
            © {new Date().getFullYear()} DevHouse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}