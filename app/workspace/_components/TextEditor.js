import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

import EditorExtensions from "./EditorExtensions";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
        paragraph: true,
      }),
      Placeholder.configure({ placeholder: "take your notes here!" }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-4",
      },
    },
  });

  useEffect(() => {
    editor && editor.commands.setContent(notes);
  }, [notes && editor]);

  return (
    <div>
      <EditorExtensions editor={editor} />
      <div className="overflow-scroll h-[88vh] ">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
