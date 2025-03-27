import { FC } from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

const Header: FC = () => {
  return (
    <>
      {/* Topbar */}
      <Topbar />
      {/* navbar */}
      <Navbar />
      {/* Cart Drawer */}
    </>
  );
};

export default Header;
