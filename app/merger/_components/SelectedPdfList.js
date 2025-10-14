"use client";

import {
  FileText,
  X,
  GripVertical,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

function SelectedPdfList({ files, onRemove, onMove }) {
  if (files.length === 0) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">
          Henüz PDF seçilmedi. En az 2 PDF seçmelisiniz.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {files.length < 2 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <p className="text-yellow-800 text-sm">
            Birleştirmek için en az 2 PDF seçmelisiniz.
          </p>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 border-b last:border-b-0 bg-white hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => onMove(index, Math.max(0, index - 1))}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Yukarı taşı"
                >
                  <ChevronUp className="h-3 w-3" />
                </button>
                <button
                  onClick={() =>
                    onMove(index, Math.min(files.length - 1, index + 1))
                  }
                  disabled={index === files.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Aşağı taşı"
                >
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <div className="bg-gray-100 rounded px-2 py-1 text-xs font-mono text-gray-600">
                {index + 1}
              </div>

              <FileText className="h-5 w-5 text-red-500" />

              <div className="flex-1">
                <div className="text-sm font-medium">
                  {file.name || file.fileName}
                </div>
                {file.isExisting && (
                  <div className="text-xs text-gray-500">Mevcut dosya</div>
                )}
                {!file.isExisting && file.size && (
                  <div className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 p-1"
              title="Kaldır"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {files.length >= 2 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-800 text-sm">
            ✅ {files.length} PDF dosyası birleştirme için hazır.
          </p>
        </div>
      )}
    </div>
  );
}

export default SelectedPdfList;
