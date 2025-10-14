"use client";

import { useState } from "react";
import { Upload, FileText, Plus } from "lucide-react";

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
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${
            dragOver
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          PDF dosyalarını buraya sürükleyin
        </h3>
        <p className="text-gray-500 mb-4">veya dosya seçmek için tıklayın</p>
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept=".pdf"
            className="hidden"
            onChange={handleFileInput}
          />
          <span className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
            Dosya Seç
          </span>
        </label>
      </div>

      {/* Existing Files */}
      {availableFiles && availableFiles.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">
            Yüklü PDF Dosyalarından Seç
          </h3>
          <div className="max-h-64 overflow-y-auto border rounded-lg">
            {availableFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">{file.fileName}</span>
                </div>
                <button
                  onClick={() => handleExistingFileSelect(file)}
                  className="text-blue-600 hover:text-blue-700 p-1"
                  title="Dosyayı ekle"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PdfDropZone;
