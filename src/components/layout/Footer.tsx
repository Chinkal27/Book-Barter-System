import React from 'react';
import { Book, Mail, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Tagline */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Book className="h-6 w-6 text-white" />
              <span className="font-serif font-bold text-xl">BookBarter</span>
            </div>
            <p className="text-primary-100 text-sm">
              Exchange textbooks with fellow students and save money while building community.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-100 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-primary-100 hover:text-white transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-primary-100 hover:text-white transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-primary-100 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-primary-100 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-100 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social and Contact */}
          <div className="col-span-1">
            <h4 className="font-medium text-lg mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-primary-100 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:contact@bookbarter.com" className="text-primary-100 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-primary-100">
              Stay updated with our newsletter
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-primary-700 text-white placeholder-primary-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-accent-400 text-sm"
              />
              <button className="bg-accent-500 hover:bg-accent-600 px-3 py-2 rounded-r-md text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-6 text-center text-sm text-primary-300">
          <p>© {new Date().getFullYear()} BookBarter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;