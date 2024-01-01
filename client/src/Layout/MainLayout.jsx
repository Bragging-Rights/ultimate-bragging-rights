import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const shouldHideFooter = () => {
    return location.pathname === "/admin";
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-content">
        <div className="w-full ml-5 mt-4">
          <Outlet />
        </div>
      </div>
      {!shouldHideFooter() && <Footer />}
    </>
  );
};

export default MainLayout;
