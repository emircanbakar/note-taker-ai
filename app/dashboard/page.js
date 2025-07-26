"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Dashboard() {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress.emailAddress,
  });

  console.log(fileList, "files");
  return (
    <div>
      <h2 className="font-medium text-2xl">Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {fileList?.length > 0
          ? fileList?.map((file, index) => (
              <Link href={"/workspace/" + file.fileId}>
                <div
                  className="flex p-4 shadow-sm rounded-md flex-col justify-center items-center border hover:shadow-xl transition-all  cursor-pointerw"
                  key={index}
                >
                  <Image
                    src={"/pdf-file.png"}
                    width={50}
                    height={50}
                    alt="pdf"
                  />
                  <h3 className="mt-2 text-lg"> {file?.fileName} </h3>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="bg-slate-100 rounded-md h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
