"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import PdfDropZone from "./_components/PdfDropZone";
import MergeProgress from "./_components/MergeProgress";
import SelectedPdfList from "./_components/SelectedPdfList";

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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">PDF Birleştir</h1>
        <p className="text-gray-600">
          Birden fazla PDF dosyasını tek bir dosyada birleştirin
        </p>
      </div>

      {isProcessing ? (
        <MergeProgress
          progress={progressUpdate.progress}
          currentStep={progressUpdate.step}
        />
      ) : mergedFileData ? (
        <div className="text-center py-12">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              PDF başarıyla birleştirildi!
            </h3>
            <p className="text-green-600 mb-4">
              Dosyalarınız başarıyla tek bir PDF dosyasında birleştirildi.
            </p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              onClick={handleDownload}
            >
              İndir ({(mergedFileData.fileSize / 1024 / 1024).toFixed(2)} MB)
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedFiles([]);
              setMergedFileData(null);
              setProgressUpdate({ progress: 0, step: 0 });
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            Yeni birleştirme işlemi başlat
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              PDF Dosyalarını Seçin
            </h2>
            <PdfDropZone
              onFileSelect={handleFileSelect}
              availableFiles={fileList}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Seçilen Dosyalar ({selectedFiles.length})
              </h2>
              {selectedFiles.length >= 2 && (
                <button
                  onClick={handleMerge}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Birleştir
                </button>
              )}
            </div>

            <SelectedPdfList
              files={selectedFiles}
              onRemove={removeFile}
              onMove={moveFile}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MergerPage;
