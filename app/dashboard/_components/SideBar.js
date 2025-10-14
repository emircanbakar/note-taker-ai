"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FilePenLine,
  Megaphone,
  SquareSplitHorizontal,
  SquaresUnite,
} from "lucide-react";
import React from "react";
import UploadPDFDialog from "./UploadPDFDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SideBar() {
  const pathname = usePathname();
  // const { user } = useUser();
  // const fileList = useQuery(api.fileStorage.GetUserFiles, {
  //   userEmail: user?.primaryEmailAddress.emailAddress,
  // });

  // const filesArray = Array.from(fileList);

  return (
    <div className="shadow-md h-screen p-4 ">
      <h2 className="text-3xl font-medium select-none">stood</h2>
      <div className="mt-10 w-full">
        <UploadPDFDialog />

        <Link href="/dashboard">
          <div
            className={`flex gap-2 items-center mt-12 p-2 rounded-sm flex-row hover:bg-accent cursor-pointer transition-all ${
              pathname === "/dashboard" ? "bg-accent" : ""
            }`}
          >
            <Megaphone />
            <span>Dashboard</span>
          </div>
        </Link>

        <Link href="/merger">
          <div
            className={`flex gap-2 items-center p-2 rounded-sm flex-row hover:bg-accent cursor-pointer transition-all ${
              pathname === "/merger" ? "bg-accent" : ""
            }`}
          >
            <SquaresUnite />
            <span>merge pdf</span>
          </div>
        </Link>
        <div className="flex gap-2 items-center opacity-30  p-2 rounded-sm flex-row hover:bg-accent select-none transition-all">
          <SquareSplitHorizontal />
          <span>split pdf</span>
        </div>
        <div className="flex gap-2 items-center opacity-30 p-2 rounded-sm flex-row hover:bg-accent select-none transition-all">
          <FilePenLine />
          <span>edit pdf</span>
        </div>
      </div>
      <div className="absolute bottom-24 w-40 flex flex-col gap-2">
        {/* <Progress value={(filesArray?.length / 5) * 100} />
        <span className="text-sm">2 out of 5 PDF uploaded</span> */}
        {/* <span className="text-sm text-gray-400">Upgrade Plan</span> */}
        <span className="text-sm  text-gray-400">developed by ejb</span>
      </div>
    </div>
  );
}

export default SideBar;
