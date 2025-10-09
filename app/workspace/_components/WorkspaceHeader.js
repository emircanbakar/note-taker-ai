import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

function WorkspaceHeader({ fileName }) {
  return (
    <div className="p-4 flex justify-between shadow-sm">
      <h2 className="text-3xl font-medium">stood</h2>
      <h2 className="font-bold uppercase"> {fileName} </h2>
      <div className="flex gap-2 items-center">
        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
