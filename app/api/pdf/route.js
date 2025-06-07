import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// const pdfUrl =
//   "https://astute-ptarmigan-554.convex.cloud/api/storage/8c1bd313-7cc1-43f6-b88f-346dd1455303";
export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  console.log(pdfUrl);
  const res = await fetch(pdfUrl);
  const data = await res.blob();
  const loader = new WebPDFLoader(data);
  const doc = await loader.load();

  let pdfTextContent = "";
  doc.forEach((d) => {
    pdfTextContent = pdfTextContent + d.pageContent;
  });

  const jsSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 60,
    chunkOverlap: 0,
  });

  const output = await jsSplitter.createDocuments([pdfTextContent]);

  let splitterList = [];
  output.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });

  return NextResponse.json({ result: splitterList });
}
