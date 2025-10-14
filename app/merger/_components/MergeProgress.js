"use client";

import { Loader2 } from "lucide-react";

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
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        </div>
        <h3 className="text-xl font-semibold mb-2">PDF'ler Birleştiriliyor</h3>
        <p className="text-gray-600">Lütfen bekleyin...</p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>İlerleme</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 text-sm
                ${index <= currentStep ? "text-blue-600" : "text-gray-400"}
              `}
            >
              <div
                className={`w-3 h-3 rounded-full
                  ${
                    index < currentStep
                      ? "bg-green-500"
                      : index === currentStep
                        ? "bg-blue-500 animate-pulse"
                        : "bg-gray-300"
                  }
                `}
              />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MergeProgress;
