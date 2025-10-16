"use client";

import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function PdfUploadZone({ onFileSelect, selectedFile }) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "application/pdf"
    );

    if (files.length > 0) {
      onFileSelect(files[0]); // Only take the first file for splitting
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files).filter(
      (file) => file.type === "application/pdf"
    );

    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
  };

  if (selectedFile) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <CardTitle className="text-sm font-medium text-green-800">
                  {selectedFile.name}
                </CardTitle>
                <CardDescription className="text-green-600">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Seçildi
              </Badge>
              <Button
                onClick={removeFile}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`border-2 border-dashed transition-colors hover:border-primary/50 ${
        dragOver ? "border-primary bg-primary/5" : ""
      }`}
    >
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
            PDF dosyasını buraya sürükleyin
          </CardTitle>
          <CardDescription className="mb-4">
            veya dosya seçmek için tıklayın
          </CardDescription>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileInput}
            />
            <Button variant="default" className="pointer-events-none">
              <Upload className="mr-2 h-4 w-4" />
              PDF Seç
            </Button>
          </label>
          <div className="mt-4 text-xs text-muted-foreground">
            Sadece PDF dosyaları desteklenir
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PdfUploadZone;
