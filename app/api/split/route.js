import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req) {
  try {
    const { file, fileName = "document.pdf", splitCount = 2 } = await req.json();

    if (!file) {
      return NextResponse.json(
        { error: "PDF dosyası gereklidir" },
        { status: 400 }
      );
    }

    if (splitCount < 2 || splitCount > 10) {
      return NextResponse.json(
        { error: "Bölme sayısı 2-10 arasında olmalıdır" },
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const base64Data = file.split(',')[1];
    const pdfBytes = Buffer.from(base64Data, 'base64');

    // Load the PDF
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = pdfDoc.getPageCount();

    if (totalPages < splitCount) {
      return NextResponse.json(
        { error: `PDF'de sadece ${totalPages} sayfa var. ${splitCount} parçaya bölemezsiniz.` },
        { status: 400 }
      );
    }

    // Calculate pages per split
    const pagesPerSplit = Math.ceil(totalPages / splitCount);
    const splitFiles = [];

    // Create split PDFs
    for (let i = 0; i < splitCount; i++) {
      const newPdf = await PDFDocument.create();
      const startPage = i * pagesPerSplit;
      const endPage = Math.min(startPage + pagesPerSplit, totalPages);

      // Only create split if there are pages to copy
      if (startPage < totalPages) {
        const pageIndices = [];
        for (let j = startPage; j < endPage; j++) {
          pageIndices.push(j);
        }

        // Copy pages to new PDF
        const copiedPages = await newPdf.copyPages(pdfDoc, pageIndices);
        copiedPages.forEach((page) => {
          newPdf.addPage(page);
        });

        // Save the split PDF
        const splitPdfBytes = await newPdf.save();
        const base64Split = Buffer.from(splitPdfBytes).toString('base64');

        // Generate filename
        const baseName = fileName.replace('.pdf', '');
        const splitFileName = `${baseName}_part_${i + 1}_of_${splitCount}.pdf`;

        splitFiles.push({
          fileName: splitFileName,
          fileData: `data:application/pdf;base64,${base64Split}`,
          fileSize: splitPdfBytes.length,
          pageRange: `${startPage + 1}-${endPage}`,
          pageCount: endPage - startPage
        });
      }
    }

    return NextResponse.json({
      success: true,
      originalFileName: fileName,
      originalPageCount: totalPages,
      splitCount: splitFiles.length,
      files: splitFiles
    });

  } catch (error) {
    console.error("PDF split error:", error);
    return NextResponse.json(
      { 
        error: "PDF bölme sırasında hata oluştu",
        details: error.message 
      },
      { status: 500 }
    );
  }
}