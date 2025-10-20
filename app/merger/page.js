"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import PdfDropZone from "./_components/PdfDropZone";
import MergeProgress from "./_components/MergeProgress";
import SelectedPdfList from "./_components/SelectedPdfList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw } from "lucide-react";

function MergerPage() {
  const { user } = useUser();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedFileData, setMergedFileData] = useState(null);
  const [progressUpdate, setProgressUpdate] = useState({
    progress: 0,
    step: 0,
  });

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  const handleFileSelect = (files) => {
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const moveFile = (fromIndex, toIndex) => {
    const newFiles = [...selectedFiles];
    const [movedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, movedFile);
    setSelectedFiles(newFiles);
  };

  const handleMerge = async () => {
    if (selectedFiles.length < 2) {
      alert("En az 2 PDF seçmelisiniz!");
      return;
    }

    setIsProcessing(true);
    setProgressUpdate({ progress: 0, step: 0 });

    try {
      // Prepare files for API
      const filesToMerge = await Promise.all(
        selectedFiles.map(async (file, index) => {
          setProgressUpdate({
            progress: (index / selectedFiles.length) * 30,
            step: 0,
          });

          if (file.isExisting) {
            return {
              isExisting: true,
              fileUrl: file.fileUrl,
              fileName: file.fileName || file.name,
              fileId: file.fileId,
            };
          } else {
            // Convert File to base64
            const base64 = await fileToBase64(file);
            return {
              isExisting: false,
              base64: base64,
              name: file.name,
              size: file.size,
            };
          }
        })
      );

      setProgressUpdate({ progress: 60, step: 2 });

      // Call merge API
      const response = await fetch("/api/merge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: filesToMerge,
          fileName: `merged-${Date.now()}.pdf`,
        }),
      });

      setProgressUpdate({ progress: 80, step: 3 });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Merge işlemi başarısız");
      }

      const result = await response.json();
      setProgressUpdate({ progress: 100, step: 4 });

      // Wait a bit for user to see completion
      await new Promise((resolve) => setTimeout(resolve, 500));

      setMergedFileData(result);
    } catch (error) {
      console.error("Merge error:", error);
      alert(`Dosyalar birleştirilirken hata oluştu: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Download function
  const handleDownload = () => {
    if (!mergedFileData?.fileData) return;

    const link = document.createElement("a");
    link.href = mergedFileData.fileData;
    link.download = mergedFileData.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        {/* <h1 className="text-3xl font-bold mb-2">PDF Birleştir</h1> */}
        <p className="text-muted-foreground">
          Birden fazla PDF dosyasını tek bir dosyada birleştirin
        </p>
      </div>

      {isProcessing ? (
        <MergeProgress
          progress={progressUpdate.progress}
          currentStep={progressUpdate.step}
        />
      ) : mergedFileData ? (
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-green-700">
                PDF başarıyla birleştirildi!
              </CardTitle>
              <CardDescription>
                Dosyalarınız başarıyla tek bir PDF dosyasında birleştirildi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleDownload} size="lg" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                İndir
                <Badge variant="secondary" className="ml-2">
                  {(mergedFileData.fileSize / 1024 / 1024).toFixed(2)} MB
                </Badge>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedFiles([]);
                  setMergedFileData(null);
                  setProgressUpdate({ progress: 0, step: 0 });
                }}
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Yeni birleştirme işlemi başlat
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>PDF Dosyalarını Seçin</CardTitle>
              <CardDescription>
                Yeni dosya yükleyin veya mevcut dosyalarınızdan seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PdfDropZone
                onFileSelect={handleFileSelect}
                availableFiles={fileList}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Seçilen Dosyalar
                    <Badge variant="secondary" className="ml-2">
                      {selectedFiles.length}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Dosyaları sıralayın ve birleştirin
                  </CardDescription>
                </div>
                {selectedFiles.length >= 2 && (
                  <Button onClick={handleMerge}>Birleştir</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <SelectedPdfList
                files={selectedFiles}
                onRemove={removeFile}
                onMove={moveFile}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default MergerPage;
