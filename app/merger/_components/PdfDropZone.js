"use client";

import { useState } from "react";
import { Upload, FileText, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function PdfDropZone({ onFileSelect, availableFiles }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );

    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    if (files.length > 0) {
      onFileSelect(files);
    }
  };

  const handleExistingFileSelect = (file) => {
    // Convert Convex file to File-like object for consistency
    const fileObj = {
      name: file.fileName,
      fileUrl: file.fileUrl,
      fileId: file.fileId,
      isExisting: true,
    };
    onFileSelect([fileObj]);
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Zone */}
      <Card className="border-2 border-dashed transition-colors hover:border-primary/50">
        <CardContent className="p-8">
          <div
            className={`text-center transition-colors ${
              dragOver ? "text-primary" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-lg mb-2">
              PDF dosyalarını buraya sürükleyin
            </CardTitle>
            <CardDescription className="mb-4">
              veya dosya seçmek için tıklayın
            </CardDescription>
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                accept=".pdf"
                className="hidden"
                onChange={handleFileInput}
              />
              <Button variant="default" className="pointer-events-none">
                <Upload className="mr-2 h-4 w-4" />
                Dosya Seç
              </Button>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Existing Files */}
      {availableFiles && availableFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Yüklü PDF Dosyalarından Seç
            </CardTitle>
            <CardDescription>
              Daha önce yüklediğiniz PDF dosyalarını seçebilirsiniz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {availableFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-red-500" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {file.fileName}
                      </span>
                      <Badge variant="secondary" className="w-fit text-xs">
                        Mevcut dosya
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleExistingFileSelect(file)}
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default PdfDropZone;
