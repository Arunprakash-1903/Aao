'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl } from 'react-icons/fa';

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON()); // Save as JSON
    },
  });

  if (!editor) return null;

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-3 border-b pb-2 bg-gray-50 px-2 py-1 rounded-md">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md hover:bg-gray-200 transition-all duration-150 ${editor.isActive('bold') ? 'bg-gray-300' : ''}`}
        >
          <FaBold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md hover:bg-gray-200 transition-all duration-150 ${editor.isActive('italic') ? 'bg-gray-300' : ''}`}
        >
          <FaItalic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md hover:bg-gray-200 transition-all duration-150 ${editor.isActive('underline') ? 'bg-gray-300' : ''}`}
        >
          <FaUnderline className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded-md hover:bg-gray-200 transition-all duration-150 ${editor.isActive('strike') ? 'bg-gray-300' : ''}`}
        >
          <FaStrikethrough className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-md hover:bg-gray-200 transition-all duration-150 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''}`}
        >
          <FaListUl className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded-md hover:bg-gray-200 transition-all duration-150 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''}`}
        >
          <FaListOl className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[250px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-transparent shadow-sm"
      />
    </div>
  );
}
