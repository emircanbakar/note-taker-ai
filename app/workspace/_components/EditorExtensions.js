import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

function EditorExtensions({ editor }) {
  if (!editor) return;
  const { fileId } = useParams();
  const searchAi = useAction(api.myActions.search);

  const onAiClick = async () => {
    toast("Cevap oluşturuluyor...");
    const selected = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ""
    );
    console.log(selected);
    console.log(fileId, "fileid");
    const res = await searchAi({
      query: selected,
      fileId: fileId,
    });

    const UnformattedAnswer = JSON.parse(res);
    let allUnformattedAnswer = "";
    UnformattedAnswer &&
      UnformattedAnswer.forEach((item) => {
        allUnformattedAnswer = allUnformattedAnswer + item.pageContent;
      });

    const PROMPT =
      "For question: " +
      selected +
      "and with the given content as answer please give appropriate in HTML format. The answer content is: " +
      allUnformattedAnswer;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    // console.log(AiModelResult.response.text());
    const finalResult = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");
    const allText = editor.getHTML();
    editor.commands.setContent(
      allText + "<p> <strong> Answer: </strong>" + finalResult + " </p>"
    );
  };

  return (
    editor && (
      <div className="p-4">
        <div className="control-group">
          <div className="button-group flex gap-2">
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "is-active" : ""
              }
            >
              <AlignLeft />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "is-active" : ""
              }
            >
              <AlignCenter />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "is-active" : ""
              }
            >
              <AlignRight />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={
                editor.isActive("bold") ? "is-active text-purple-600" : ""
              }
            >
              <Bold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={
                editor.isActive("italic") ? "is-active text-purple-600" : ""
              }
            >
              <Italic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "is-active" : ""}
            >
              <Highlighter />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={() => onAiClick()}
              className={"hover:text-purple-600 transition-all"}
            >
              <Sparkles />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtensions;
