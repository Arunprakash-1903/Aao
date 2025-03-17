'use client';

import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

interface RichTextRendererProps {
  content: Record<string, any> | null;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  if (!content) return null;

  const html = generateHTML(content, [StarterKit]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RichTextRenderer;
