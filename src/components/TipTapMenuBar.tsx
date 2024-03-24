import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Codepen,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import React from "react";

type Props = {
  editor: Editor;
};

const TipTapMenuBar = ({ editor }: Props) => {
  return (
    <div className="flex flex-wrap gap-1">
      {/* Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={[
          "menu-bar-button ",
          editor.isActive("bold") ? "is-active " : "",
        ].join(" ")}
      >
        <Bold className="w-6 h-6" />
      </button>

      {/* Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={[
          "menu-bar-button ",
          editor.isActive("italic") ? "is-active" : "",
        ].join(" ")}
      >
        <Italic className="w-6 h-6" />
      </button>

      {/* Strike */}
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={[
          "menu-bar-button ",
          editor.isActive("strike") ? "is-active" : "",
        ].join(" ")}
      >
        <Strikethrough className="w-6 h-6" />
      </button>

      {/* Code */}
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={[
          "menu-bar-button ",
          editor.isActive("code") ? "is-active" : "",
        ].join(" ")}
      >
        <Code className="w-6 h-6" />
      </button>

      {/* BulletList */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={[
          "menu-bar-button ",
          editor.isActive("bulletList") ? "is-active" : "",
        ].join(" ")}
      >
        <List className="w-6 h-6" />
      </button>

      {/* OrderedList */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={[
          "menu-bar-button ",
          editor.isActive("orderedList") ? "is-active" : "",
        ].join(" ")}
      >
        <ListOrdered className="w-6 h-6" />
      </button>

      {/* Heading1 */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={[
          "menu-bar-button ",
          editor.isActive("heading", { level: 1 }) ? "is-active" : "",
        ].join(" ")}
      >
        <Heading1 className="w-6 h-6" />
      </button>

      {/* Heading2 */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={[
          "menu-bar-button ",
          editor.isActive("heading", { level: 2 }) ? "is-active" : "",
        ].join(" ")}
      >
        <Heading2 className="w-6 h-6" />
      </button>

      {/* Heading3 */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
        }
        className={[
          "menu-bar-button ",
          editor.isActive("heading", { level: 3 }) ? "is-active" : "",
        ].join(" ")}
      >
        <Heading3 className="w-6 h-6" />
      </button>

      {/* Heading4 */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 4 }).run()
        }
        className={[
          "menu-bar-button ",
          editor.isActive("heading", { level: 4 }) ? "is-active" : "",
        ].join(" ")}
      >
        <Heading4 className="w-6 h-6" />
      </button>

      {/* CodeBlock */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        className={[
          "menu-bar-button ",
          editor.isActive("codeBlock") ? "is-active" : "",
        ].join(" ")}
      >
        <Codepen className="w-6 h-6" />
      </button>

      {/* BlockQuote */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        disabled={!editor.can().chain().focus().toggleBlockquote().run()}
        className={[
          "menu-bar-button ",
          editor.isActive("blockQuote") ? "is-active" : "",
        ].join(" ")}
      >
        <Quote className="w-6 h-6" />
      </button>

      {/* Undo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="menu-bar-button"
      >
        <Undo className="w-6 h-6" />
      </button>

      {/* Redo */}
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="menu-bar-button"
      >
        <Redo className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TipTapMenuBar;
