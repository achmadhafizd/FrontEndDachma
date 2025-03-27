import { FC } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <footer className="border-t border-gray-300 py-12 pl-9">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign up and get 10% off your first order.
          </p>

          {/* Newsletter Form */}
          <form action="" className="flex ">
            <input
              type="email"
              className="p-3 w-full text-sm border-t border-l border-b  border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="cursor-pointer bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-600 "></ul>
          <li className="list-none">
            <Link to="#" className="hover:text-gray-500 transition-colors">
              Men's Top Wear
            </Link>
          </li>
          <li className="list-none">
            <Link to="#" className="hover:text-gray-500 transition-colors">
              Women's Top Wear
            </Link>
          </li>
          <li className="list-none">
            <Link to="#" className="hover:text-gray-500 transition-colors">
              Men's Bottom Wear
            </Link>
          </li>
          <li className="list-none">
            <Link to="#" className="hover:text-gray-500 transition-colors">
              Women's Bottom Wear
            </Link>
          </li>
        </div>
        {/* Help links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-600"></ul>
          <li className="list-none">
            <Link to="#" className="hover:text-gray-500 transition-colors">
              Contact Us
            </Link>
          </li>
          <li className="list-none">
            <Link to="#" className="hover:text-gray-500 transition-colors">
              About Us
            </Link>
          </li>
          <li className="list-none">
            <Link to="#" className="hover:text-gray-500 transition-colors">
              FAQs
            </Link>
          </li>
          <li className="list-none">
            <Link to="#" className="hover:text-gray-500 transition-colors">
              Features
            </Link>
          </li>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center spaxe-x-4 mb-6">
            <a
              href="http://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="http://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="http://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-500 ">Call Us </p>
          <FiPhoneCall className="inline-block mr-2 " />
          +62 (857) 7771-1114
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          &copy; {new Date().getFullYear()} Dachma. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
