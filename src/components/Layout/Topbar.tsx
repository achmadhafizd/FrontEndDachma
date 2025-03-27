import { FC } from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";

const Topbar: FC = () => {
  return (
    <div className="bg-[#ea2e0e] text-white">
      <div className="container flex mx-auto justify-between items-center py-3 ">
        <div className="hidden md:flex mx-6 items-center space-x-4">
          <a href="#" className="hover:text-gray-300 ">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300 ">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300 ">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>
        <div className="text-sm hidden md:block mx-6">
          <a href="tel:+6285777711114" className="hover:text-gray-300">
            +62 (857) 7771-1114
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
