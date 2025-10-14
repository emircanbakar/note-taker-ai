import React from "react";
import SideBar from "../dashboard/_components/SideBar";
import Header from "../dashboard/_components/Header";

function MergerLayout({ children }) {
  return (
    <div>
      <div className="md:w-48 h-screen fixed">
        <SideBar />
      </div>
      <div className="md:ml-48">
        <Header />
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

export default MergerLayout;
