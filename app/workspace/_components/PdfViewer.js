import React from "react";

function PdfViewer({ fileUrl }) {
  return (
    <div>
      <iframe
        src={fileUrl + "#toolbar=0"}
        height="90vh"
        width="100%"
        className="h-[90vh]"
      ></iframe>
    </div>
  );
}

export default PdfViewer;
