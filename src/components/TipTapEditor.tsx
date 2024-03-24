"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { Loader2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Text } from "@tiptap/extension-text";
import { useCompletion } from "ai/react";

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState ? note.editorState : `<h1>${note.name}`
  );

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState: editorState,
      });
      return response.data;
    },
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Mod-Shift-a": () => {
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          // console.log(prompt);
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastCompletion = React.useRef("");
  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debounceEditorState = useDebounce(editorState, 500);

  React.useEffect(() => {
    // save to db
    if (debounceEditorState === "") {
      return;
    }

    saveNote.mutate(undefined, {
      onSuccess: () => {
        console.log("success update");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }, [debounceEditorState]);

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"} size={"sm"} className="ml-auto">
          {saveNote.isPending && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          {saveNote.isPending ? "Saving" : "Saved"}
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="prose prose-sm w-full">
        <EditorContent editor={editor} />
      </div>

      <Separator className="my-4" />

      <span>
        Tip: Press{" "}
        <kbd className="px-2 py-1.5 font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
          Control + Shift + A
        </kbd>{" "}
        for AI auto complete.
      </span>
    </>
  );
};

export default TipTapEditor;
