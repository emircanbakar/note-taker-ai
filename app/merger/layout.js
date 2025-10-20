"use client";

import React from "react";
import SideBar from "../dashboard/_components/SideBar";
import Header from "../dashboard/_components/Header";
import { useUser } from "@clerk/nextjs";

function MergerLayout({ children }) {
  const { user } = useUser();
  return (
    <div>
      <div className="md:w-48 h-screen fixed">
        <SideBar />
      </div>
      <div className="md:ml-48">
        {user ? "" : <Header />}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

export default MergerLayout;
