import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import React from "react";

function WorkspaceHeader({ fileName }) {
  return (
    <div className="p-4 flex justify-between shadow-sm">
      <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
      <h2 className="font-bold uppercase"> {fileName} </h2>
      <div className="flex gap-2 items-center">
        {/* <Button onClick={saveCurrentNote()}>Save</Button> */}
        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
