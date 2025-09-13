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
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

function UploadPDFDialog({ children }) {
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState();
  const { user } = useUser();
  const [fileName, setFileName] = useState();
  const [open, setOpen] = useState(false);

  const embedDocument = useAction(api.myActions.ingest);
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const InsertFileEntry = useMutation(api.fileStorage.AddFileToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);

  const onFileSelect = (e) => {
    setFiles(e.target.files[0]);
  };

  const onClose = () => {
    setOpen(false);
    setFiles(null);
    setFileName("");
    setLoading(false);
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

    const apiRes = await axios.get("/api/pdf?pdfUrl=" + fileUrl);
    console.log(apiRes.data.result);
    await embedDocument({
      splittedText: apiRes.data.result,
      fileId: fileId,
    });

    setLoading(false);
    setOpen(false);

    toast("file is ready...");
  };

  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button className="w-full" onClick={() => setOpen(true)}>
          + Upload Pdf File
        </Button>
      </DialogTrigger>
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
            <Button type="button" variant="secondary" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
          <Button onClick={onLoad} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPDFDialog;
