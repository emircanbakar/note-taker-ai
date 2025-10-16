"use client";

import { Download, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function SplitResults({ results, originalFileName }) {
  const handleDownload = (fileData, fileName) => {
    const link = document.createElement("a");
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = () => {
    results.files.forEach((file, index) => {
      setTimeout(() => {
        handleDownload(file.fileData, file.fileName);
      }, index * 500); // Stagger downloads by 500ms
    });
  };

  if (!results || !results.files) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Bölünmüş Dosyalar</h3>
          <p className="text-sm text-muted-foreground">
            {results.files.length} parça hazır
          </p>
        </div>
        <Button onClick={handleDownloadAll} className="shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Tümünü İndir
        </Button>
      </div>

      <div className="space-y-2">
        {results.files.map((file, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium text-sm">{file.fileName}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Parça {index + 1}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {(file.fileSize / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownload(file.fileData, file.fileName)}
                  size="sm"
                  variant="outline"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-3">
        <div className="text-sm text-muted-foreground text-center">
          💡 İpucu: Tüm dosyaları tek seferde indirmek için "Tümünü İndir"
          butonunu kullanın
        </div>
      </div>
    </div>
  );
}

export default SplitResults;
