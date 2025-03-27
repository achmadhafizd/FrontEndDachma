import { FC } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

const UserLayout: FC = () => {
  return (
    <header className="border-b border-gray-200">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </header>
  );
};

export default UserLayout;
