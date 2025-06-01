import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <div className="border-b-2 border-b-accent">
      <div className="flex justify-end p-4">
        {" "}
        <UserButton />{" "}
      </div>
    </div>
  );
}

export default Header;
