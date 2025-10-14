"use client";

import { Loader2, CheckCircle, Circle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

function MergeProgress({ progress = 0, currentStep = 0 }) {
  const steps = [
    "PDF dosyaları yükleniyor...",
    "Dosyalar analiz ediliyor...",
    "Sayfalar birleştiriliyor...",
    "Son kontroller yapılıyor...",
    "Birleştirilmiş PDF oluşturuluyor...",
  ];

  return (
    <div className="max-w-md mx-auto mt-12">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
          <CardTitle>PDF'ler Birleştiriliyor</CardTitle>
          <CardDescription>Lütfen bekleyin...</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>İlerleme</span>
              <Badge variant="outline">{Math.round(progress)}%</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 text-sm transition-colors
                  ${index <= currentStep ? "text-primary" : "text-muted-foreground"}
                `}
              >
                <div className="flex-shrink-0">
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : index === currentStep ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MergeProgress;
