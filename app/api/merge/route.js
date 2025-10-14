import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req) {
  try {
    const { files, fileName = "merged-document.pdf" } = await req.json();

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: "En az 2 PDF dosyası gereklidir" },
        { status: 400 }
      );
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Process each file
    for (const file of files) {
      let pdfBytes;

      if (file.isExisting && file.fileUrl) {
        // Fetch existing file from URL
        const response = await fetch(file.fileUrl);
        if (!response.ok) {
          throw new Error(`Dosya indirilemedi: ${file.fileName}`);
        }
        pdfBytes = await response.arrayBuffer();
      } else if (file.base64) {
        // Convert base64 to buffer
        const base64Data = file.base64.split(",")[1];
        pdfBytes = Buffer.from(base64Data, "base64");
      } else {
        throw new Error(`Geçersiz dosya formatı: ${file.name}`);
      }

      // Load the PDF
      const pdf = await PDFDocument.load(pdfBytes);

      // Copy all pages from this PDF to the merged PDF
      const pageIndices = pdf.getPageIndices();
      const copiedPages = await mergedPdf.copyPages(pdf, pageIndices);

      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    // Serialize the merged PDF
    const mergedPdfBytes = await mergedPdf.save();

    // Convert to base64 for response
    const base64Pdf = Buffer.from(mergedPdfBytes).toString("base64");

    return NextResponse.json({
      success: true,
      fileName,
      fileData: `data:application/pdf;base64,${base64Pdf}`,
      fileSize: mergedPdfBytes.length,
    });
  } catch (error) {
    console.error("PDF merge error:", error);
    return NextResponse.json(
      {
        error: "PDF birleştirme sırasında hata oluştu",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Handle file upload for new PDFs
export async function PUT(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    const processedFiles = [];

    for (const file of files) {
      if (file.type !== "application/pdf") {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");

      processedFiles.push({
        name: file.name,
        size: file.size,
        base64: `data:application/pdf;base64,${base64}`,
        isExisting: false,
      });
    }

    return NextResponse.json({
      success: true,
      files: processedFiles,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      {
        error: "Dosya yükleme sırasında hata oluştu",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
