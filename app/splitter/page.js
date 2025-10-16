"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCw } from "lucide-react";
import PdfUploadZone from "./_components/PdfUploadZone";
import SplitOptions from "./_components/SplitOptions";
import SplitProgress from "./_components/SplitProgress";
import SplitResults from "./_components/SplitResults";

function SplitterPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [splitOption, setSplitOption] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitResults, setSplitResults] = useState(null);
  const [progressUpdate, setProgressUpdate] = useState({
    progress: 0,
    step: 0,
  });

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setSplitResults(null);
  };

  const handleSplit = async () => {
    if (!selectedFile) {
      alert("Lütfen önce bir PDF dosyası seçin!");
      return;
    }

    setIsProcessing(true);
    setProgressUpdate({ progress: 0, step: 0 });

    try {
      // Convert file to base64
      const base64 = await fileToBase64(selectedFile);
      setProgressUpdate({ progress: 30, step: 1 });

      // Call split API
      const response = await fetch("/api/split", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64,
          fileName: selectedFile.name,
          splitCount: splitOption,
        }),
      });

      setProgressUpdate({ progress: 80, step: 3 });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Bölme işlemi başarısız");
      }

      const result = await response.json();
      setProgressUpdate({ progress: 100, step: 4 });

      // Wait a bit for user to see completion
      await new Promise((resolve) => setTimeout(resolve, 500));

      setSplitResults(result);
    } catch (error) {
      console.error("Split error:", error);
      alert(`PDF bölme sırasında hata oluştu: ${error.message}`);
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

  const handleReset = () => {
    setSelectedFile(null);
    setSplitResults(null);
    setProgressUpdate({ progress: 0, step: 0 });
    setSplitOption(2);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">PDF Böl</h1>
        <p className="text-muted-foreground">
          PDF dosyanızı eşit sayfalara bölün ve ayrı dosyalar olarak indirin
        </p>
      </div>

      {isProcessing ? (
        <SplitProgress
          progress={progressUpdate.progress}
          currentStep={progressUpdate.step}
          splitCount={splitOption}
        />
      ) : splitResults ? (
        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-green-600">
                PDF başarıyla bölündü!
              </CardTitle>
              <CardDescription>
                Dosyanız {splitOption} parçaya bölündü. Aşağıdan indirme
                yapabilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SplitResults
                results={splitResults}
                originalFileName={selectedFile?.name}
              />
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full mt-4"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Yeni bölme işlemi başlat
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>PDF Dosyası Yükle</CardTitle>
              <CardDescription>
                Bölmek istediğiniz PDF dosyasını seçin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PdfUploadZone
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Bölme Seçenekleri
                {selectedFile && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedFile.name}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                PDF'i kaç parçaya bölmek istediğinizi seçin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SplitOptions
                selectedOption={splitOption}
                onOptionChange={setSplitOption}
                disabled={!selectedFile}
              />

              {selectedFile && (
                <Button onClick={handleSplit} className="w-full" size="lg">
                  PDF'i {splitOption} Parçaya Böl
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default SplitterPage;
