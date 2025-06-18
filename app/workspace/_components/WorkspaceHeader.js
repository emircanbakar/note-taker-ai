import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import React from "react";

function WorkspaceHeader() {
  return (
    <div className="p-4 flex justify-between shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
      <UserButton />
    </div>
  );
}

export default WorkspaceHeader;
