"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

function UploadPDFDialog({ children }) {
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState();
  const { user } = useUser();
  const [fileName, setFileName] = useState();
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const InsertFileEntry = useMutation(api.fileStorage.AddFileToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);

  const onFileSelect = (e) => {
    setFiles(e.target.files[0]);
  };

  const onLoad = async () => {
    setLoading(true);

    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": files.type },
      body: files,
    });

    const { storageId } = await result.json();

    console.log(storageId, "storedId");
    const fileId = uuidv4();
    const fileUrl = await getFileUrl({ storageId: storageId });

    const res = await InsertFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ?? "Untitled",
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    console.log(res, "res");

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger> {children} </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="flex gap-4 p-3 divide-x my-2 ">
                <h2>Select file to upload</h2>
                <input
                  type="file"
                  className="border p-2 rounded-sm"
                  accept="application/pdf"
                  onChange={(e) => onFileSelect(e)}
                />
              </div>
              <div>
                <Input
                  placeholder="file name"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onLoad}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPDFDialog;
