import React, { useState } from 'react';
import { Bold, Italic, List, ListOrdered, Quote, Link, Image, Code, Eye, EyeOff } from 'lucide-react';

interface ArticleEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ArticleEditor({ value, onChange, placeholder }: ArticleEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const insertTag = (tag: string, endTag?: string) => {
    const textarea = document.getElementById('article-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + 
                   `<${tag}>${selectedText}${endTag ? `</${endTag}>` : ''}` + 
                   value.substring(end);
    
    onChange(newText);
    
    // Cursor pozisyonunu ayarla
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length + 1, start + tag.length + 1 + selectedText.length);
    }, 0);
  };

  const insertBlock = (tag: string) => {
    const textarea = document.getElementById('article-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const newText = value.substring(0, start) + 
                   `\n<${tag}>\n\n</${tag}>\n` + 
                   value.substring(start);
    
    onChange(newText);
    
    // Cursor pozisyonunu ayarla
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length + 3, start + tag.length + 3);
    }, 0);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => insertTag('strong')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('em')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <button
            type="button"
            onClick={() => insertBlock('h2')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Heading"
          >
            <span className="text-sm font-bold">H</span>
          </button>
          <button
            type="button"
            onClick={() => insertBlock('blockquote')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Quote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <button
            type="button"
            onClick={() => insertBlock('ul')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Unordered List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertBlock('ol')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Ordered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          <button
            type="button"
            onClick={() => insertTag('code')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Code"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('a', 'a')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Link"
          >
            <Link className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => insertTag('img')}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Image"
          >
            <Image className="w-4 h-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center space-x-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showPreview ? 'Edit' : 'Preview'}</span>
        </button>
      </div>

      {/* Editor/Preview */}
      {showPreview ? (
        <div className="p-4 bg-white">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        </div>
      ) : (
        <textarea
          id="article-content"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full p-4 border-0 focus:ring-0 resize-none font-mono text-sm text-gray-800 placeholder-gray-400"
          rows={15}
        />
      )}
    </div>
  );
} 