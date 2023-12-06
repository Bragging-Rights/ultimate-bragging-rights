import React from "react";
import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  console.log(children);
  const location = useLocation();

  const shouldHideFooter = () => {
    // console.log("Current pathname:", location.pathname);
    return location.pathname === "/admin";
  };

  return (
    <>
      <Navbar />

      <div className="flex w-full">
        <div className=" w-10/12  ml-5 mt-4">
          <Outlet />
        </div>
        <div className=" w-2/12"></div>
      </div>
      {!shouldHideFooter() && <Footer />}
    </>
  );
};

export default MainLayout;
