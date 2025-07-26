"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadPDFDialog from "./UploadPDFDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function SideBar() {
  // const { user } = useUser();
  // const fileList = useQuery(api.fileStorage.GetUserFiles, {
  //   userEmail: user?.primaryEmailAddress.emailAddress,
  // });

  // const filesArray = Array.from(fileList);

  return (
    <div className="shadow-md h-screen p-4 ">
      <Image src={"/logo.svg"} alt="logo" width={80} height={80} />
      <div className="mt-10">
        <UploadPDFDialog>
          <Button className="w-full" variant="outline">
            Upload PDF
          </Button>
        </UploadPDFDialog>

        <div className="flex gap-2 items-center my-4 p-2 rounded-sm flex-row hover:bg-accent cursor-pointer transition-all">
          <Layout />
          <span>Workspace</span>
        </div>
        <div className="flex gap-2 items-center my-4 p-2 rounded-sm flex-row hover:bg-accent cursor-pointer transition-all">
          <Shield />
          <span>Upgrade Plan</span>
        </div>
      </div>
      <div className="absolute bottom-24 w-40 flex flex-col gap-2">
        {/* <Progress value={(filesArray?.length / 5) * 100} />
        <span className="text-sm">2 out of 5 PDF uploaded</span> */}
        <span className="text-sm text-gray-400">Upgrade Plan</span>
      </div>
    </div>
  );
}

export default SideBar;
