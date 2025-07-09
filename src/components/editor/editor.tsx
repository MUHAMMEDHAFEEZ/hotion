'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Plus,
  GripVertical,
  MoreHorizontal
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface EditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  editable?: boolean
  className?: string
}

interface Block {
  id: string
  type: string
  content: any
  position: number
}

export function Editor({ 
  content = '', 
  onChange, 
  placeholder = 'Start writing...', 
  editable = true,
  className 
}: EditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [activeBlock, setActiveBlock] = useState<string | null>(null)
  const [showBlockMenu, setShowBlockMenu] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'plaintext',
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
    editorProps: {
      attributes: {
        class: cn(
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
          'prose-headings:font-bold prose-headings:text-gray-900',
          'prose-p:text-gray-700 prose-p:leading-relaxed',
          'prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline',
          'prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4',
          'prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded',
          'prose-pre:bg-gray-900 prose-pre:text-gray-100',
          'prose-ul:list-disc prose-ol:list-decimal',
          'prose-li:marker:text-gray-400',
          'max-w-none'
        ),
      },
    },
  })

  const ToolbarButton = ({ 
    onClick, 
    isActive = false, 
    disabled = false, 
    children 
  }: {
    onClick: () => void
    isActive?: boolean
    disabled?: boolean
    children: React.ReactNode
  }) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-8 w-8 p-0",
        isActive && "bg-blue-100 text-blue-700 hover:bg-blue-200"
      )}
    >
      {children}
    </Button>
  )

  const BlockMenu = () => {
    const blockTypes = [
      { type: 'paragraph', label: 'Text', icon: <AlignLeft className="w-4 h-4" /> },
      { type: 'heading1', label: 'Heading 1', icon: <Heading1 className="w-4 h-4" /> },
      { type: 'heading2', label: 'Heading 2', icon: <Heading2 className="w-4 h-4" /> },
      { type: 'heading3', label: 'Heading 3', icon: <Heading3 className="w-4 h-4" /> },
      { type: 'bulletList', label: 'Bullet List', icon: <List className="w-4 h-4" /> },
      { type: 'orderedList', label: 'Numbered List', icon: <ListOrdered className="w-4 h-4" /> },
      { type: 'taskList', label: 'To-do List', icon: <List className="w-4 h-4" /> },
      { type: 'blockquote', label: 'Quote', icon: <Quote className="w-4 h-4" /> },
      { type: 'codeBlock', label: 'Code', icon: <Code className="w-4 h-4" /> },
      { type: 'table', label: 'Table', icon: <TableIcon className="w-4 h-4" /> },
    ]

    return (
      <div className="absolute left-0 top-8 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 min-w-48">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
          Turn into
        </div>
        {blockTypes.map((block) => (
          <button
            key={block.type}
            className="w-full flex items-center space-x-2 px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            onClick={() => {
              if (block.type === 'table') {
                editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
              } else if (block.type === 'taskList') {
                editor?.chain().focus().toggleTaskList().run()
              } else if (block.type === 'bulletList') {
                editor?.chain().focus().toggleBulletList().run()
              } else if (block.type === 'orderedList') {
                editor?.chain().focus().toggleOrderedList().run()
              } else if (block.type === 'blockquote') {
                editor?.chain().focus().toggleBlockquote().run()
              } else if (block.type === 'codeBlock') {
                editor?.chain().focus().toggleCodeBlock().run()
              } else if (block.type === 'heading1') {
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              } else if (block.type === 'heading2') {
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              } else if (block.type === 'heading3') {
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              } else {
                editor?.chain().focus().setParagraph().run()
              }
              setShowBlockMenu(false)
            }}
          >
            {block.icon}
            <span>{block.label}</span>
          </button>
        ))}
      </div>
    )
  }

  if (!editor) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />
  }

  return (
    <div className={cn("border border-gray-200 dark:border-gray-700 rounded-lg", className)}>
      {/* Toolbar */}
      {editable && (
        <div className="border-b border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center space-x-1 flex-wrap gap-2">
            {/* Undo/Redo */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo className="w-4 h-4" />
              </ToolbarButton>
            </div>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Text Formatting */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
              >
                <Bold className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
              >
                <Italic className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
              >
                <Strikethrough className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
              >
                <Code className="w-4 h-4" />
              </ToolbarButton>
            </div>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Block Types */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
              >
                <Heading1 className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
              >
                <Heading2 className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
              >
                <Heading3 className="w-4 h-4" />
              </ToolbarButton>
            </div>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Lists */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
              >
                <List className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
              >
                <ListOrdered className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                isActive={editor.isActive('taskList')}
              >
                <List className="w-4 h-4" />
              </ToolbarButton>
            </div>

            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />

            {/* Other */}
            <div className="flex items-center space-x-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
              >
                <Quote className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editor.isActive('codeBlock')}
              >
                <Code className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => {
                  const url = window.prompt('Enter image URL:')
                  if (url) {
                    editor.chain().focus().setImage({ src: url }).run()
                  }
                }}
              >
                <ImageIcon className="w-4 h-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              >
                <TableIcon className="w-4 h-4" />
              </ToolbarButton>
            </div>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="relative">
        {/* Block Menu Trigger */}
        {editable && (
          <div className="absolute left-2 top-2 z-10">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-6 w-6 p-0 opacity-0 hover:opacity-100 transition-opacity",
                  showBlockMenu && "opacity-100"
                )}
                onClick={() => setShowBlockMenu(!showBlockMenu)}
              >
                <Plus className="w-3 h-3" />
              </Button>
              {showBlockMenu && <BlockMenu />}
            </div>
          </div>
        )}

        <div className="min-h-[200px] p-4 pl-12">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
