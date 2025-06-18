"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function Workspace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.getFileRecord, {
    fileId: fileId,
  });

  useEffect(() => {
    console.log(fileInfo, "fileinfo");
  }, [fileInfo]);

  // const getFileInfo = async () => {
  //   const res = await getFileRecord({ fileId: fileId });
  // };

  return (
    <div>
      <WorkspaceHeader />
      <div>
        <div>text editor</div>
        <div>
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
