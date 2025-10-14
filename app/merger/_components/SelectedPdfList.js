"use client";

import { FileText, X, ChevronUp, ChevronDown } from "lucide-react";
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

function SelectedPdfList({ files, onRemove, onMove }) {
  if (files.length === 0) {
    return (
      <Card className="border-2 border-dashed">
        <CardContent className="p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <CardTitle className="text-lg mb-2">Henüz PDF seçilmedi</CardTitle>
          <CardDescription>En az 2 PDF seçmelisiniz.</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {files.length < 2 && (
        <Alert>
          <AlertDescription>
            Birleştirmek için en az 2 PDF seçmelisiniz.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-0">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex flex-col space-y-1">
                  <Button
                    onClick={() => onMove(index, Math.max(0, index - 1))}
                    disabled={index === 0}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    onClick={() =>
                      onMove(index, Math.min(files.length - 1, index + 1))
                    }
                    disabled={index === files.length - 1}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>

                <Badge variant="outline" className="font-mono">
                  {index + 1}
                </Badge>

                <FileText className="h-5 w-5 text-red-500" />

                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {file.name || file.fileName}
                  </div>
                  <div className="flex gap-2 mt-1">
                    {file.isExisting && (
                      <Badge variant="secondary" className="text-xs">
                        Mevcut dosya
                      </Badge>
                    )}
                    {!file.isExisting && file.size && (
                      <Badge variant="outline" className="text-xs">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => onRemove(index)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {files.length >= 2 && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            ✅ {files.length} PDF dosyası birleştirme için hazır.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default SelectedPdfList;
