'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Star,
  Share2,
  MoreHorizontal,
  Plus,
  Type,
  Hash,
  List,
  CheckSquare,
  Image,
  Table,
  Quote,
  Code,
  Calendar,
  Users,
  Settings,
  Trash2,
  Copy
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface User {
  id: string
  name: string
  email: string
}

interface PageData {
  id: string
  title: string
  emoji: string
  content: string
  isFavorite: boolean
  lastModified: string
}

export default function EditorPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [pageData, setPageData] = useState<PageData>({
    id: params.id,
    title: 'Untitled',
    emoji: '📄',
    content: '',
    isFavorite: false,
    lastModified: new Date().toISOString()
  })
  const [showBlockMenu, setShowBlockMenu] = useState(false)
  const [showPageMenu, setShowPageMenu] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const editor = useEditor({
    extensions: [StarterKit],
    content: pageData.content || `
      <h1>Welcome to your new page!</h1>
      <p>Start writing here... You can add different types of content by typing <strong>/</strong> to open the block menu.</p>
      <p></p>
      <h2>What you can do:</h2>
      <ul>
        <li>Create headings with # ## ###</li>
        <li>Make lists like this one</li>
        <li>Add <strong>bold</strong> and <em>italic</em> text</li>
        <li>Insert links, images, and more</li>
      </ul>
      <p></p>
      <blockquote>
        <p>💡 Tip: Press <strong>/</strong> anywhere to see all available blocks and formatting options!</p>
      </blockquote>
      <p></p>
      <p>Click anywhere to start editing. Have fun! 🎉</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-0 py-4',
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML()
      setPageData(prev => ({ ...prev, content }))
      savePage({ ...pageData, content })
    },
  })

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('hotion_user')
    if (!savedUser) {
      router.push('/auth/signin')
      return
    }
    setUser(JSON.parse(savedUser))

    // Load page data
    loadPage(params.id)
  }, [router, params.id])

  const loadPage = (pageId: string) => {
    const savedPages = localStorage.getItem('hotion_pages')
    if (savedPages) {
      const pages = JSON.parse(savedPages)
      const page = pages.find((p: any) => p.id === pageId)
      if (page) {
        setPageData(page)
        editor?.commands.setContent(page.content || '')
      }
    }
  }

  const savePage = (data: PageData) => {
    setIsSaving(true)
    setTimeout(() => {
      const savedPages = localStorage.getItem('hotion_pages') || '[]'
      const pages = JSON.parse(savedPages)
      const pageIndex = pages.findIndex((p: any) => p.id === data.id)
      
      const updatedPage = {
        ...data,
        lastModified: new Date().toISOString()
      }

      if (pageIndex !== -1) {
        pages[pageIndex] = updatedPage
      } else {
        pages.unshift(updatedPage)
      }
      
      localStorage.setItem('hotion_pages', JSON.stringify(pages))
      setIsSaving(false)
    }, 500)
  }

  const updatePageTitle = (title: string) => {
    const updatedData = { ...pageData, title }
    setPageData(updatedData)
    savePage(updatedData)
  }

  const updatePageEmoji = (emoji: string) => {
    const updatedData = { ...pageData, emoji }
    setPageData(updatedData)
    savePage(updatedData)
  }

  const toggleFavorite = () => {
    const updatedData = { ...pageData, isFavorite: !pageData.isFavorite }
    setPageData(updatedData)
    savePage(updatedData)
  }

  const handleShare = () => {
    setIsSharing(true)
    setTimeout(() => {
      navigator.clipboard.writeText(`${window.location.origin}/editor/${pageData.id}`)
      alert('Page link copied to clipboard!')
      setIsSharing(false)
    }, 1000)
  }

  const handleDuplicate = () => {
    const newId = Date.now().toString()
    const duplicatedPage = {
      ...pageData,
      id: newId,
      title: `${pageData.title} (Copy)`,
      lastModified: new Date().toISOString()
    }
    
    const savedPages = localStorage.getItem('hotion_pages') || '[]'
    const pages = JSON.parse(savedPages)
    pages.unshift(duplicatedPage)
    localStorage.setItem('hotion_pages', JSON.stringify(pages))
    
    router.push(`/editor/${newId}`)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this page?')) {
      const savedPages = localStorage.getItem('hotion_pages') || '[]'
      const pages = JSON.parse(savedPages)
      const filteredPages = pages.filter((p: any) => p.id !== pageData.id)
      localStorage.setItem('hotion_pages', JSON.stringify(filteredPages))
      router.push('/dashboard')
    }
  }

  const blockTypes = [
    { icon: Type, label: 'Text', description: 'Just start writing with plain text', action: () => editor?.commands.setParagraph() },
    { icon: Hash, label: 'Heading 1', description: 'Big section heading', action: () => editor?.commands.toggleHeading({ level: 1 }) },
    { icon: Hash, label: 'Heading 2', description: 'Medium section heading', action: () => editor?.commands.toggleHeading({ level: 2 }) },
    { icon: Hash, label: 'Heading 3', description: 'Small section heading', action: () => editor?.commands.toggleHeading({ level: 3 }) },
    { icon: List, label: 'Bulleted list', description: 'Create a simple bulleted list', action: () => editor?.commands.toggleBulletList() },
    { icon: List, label: 'Numbered list', description: 'Create a list with numbering', action: () => editor?.commands.toggleOrderedList() },
    { icon: CheckSquare, label: 'To-do list', description: 'Track tasks with a to-do list', action: () => alert('To-do lists coming soon!') },
    { icon: Quote, label: 'Quote', description: 'Capture a quote', action: () => editor?.commands.toggleBlockquote() },
    { icon: Code, label: 'Code', description: 'Capture a code snippet', action: () => editor?.commands.toggleCodeBlock() },
    { icon: Image, label: 'Image', description: 'Upload or embed with a link', action: () => alert('Image upload coming soon!') },
    { icon: Table, label: 'Table', description: 'Create a table', action: () => alert('Tables coming soon!') },
    { icon: Calendar, label: 'Calendar', description: 'Embed a calendar view', action: () => alert('Calendar integration coming soon!') },
  ]

  const emojis = ['📄', '📝', '📋', '📊', '📈', '📉', '📅', '📌', '📍', '💡', '🎯', '🚀', '🔥', '⭐', '❤️', '🎉', '💼', '🏠', '🎨', '🔧']

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button 
                  className="text-2xl hover:bg-gray-100 rounded p-1"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  {pageData.emoji}
                </button>
              </div>
              <input
                type="text"
                value={pageData.title}
                onChange={(e) => updatePageTitle(e.target.value)}
                className="text-lg font-semibold text-gray-900 bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2 py-1 min-w-0 flex-1"
                placeholder="Untitled"
              />
              {isSaving && (
                <span className="text-xs text-gray-500">Saving...</span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFavorite}
              className={pageData.isFavorite ? 'text-yellow-600' : ''}
            >
              <Star className={`w-4 h-4 ${pageData.isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              disabled={isSharing}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isSharing ? 'Sharing...' : 'Share'}
            </Button>

            <Button variant="outline" size="sm" onClick={() => alert('Collaboration coming soon!')}>
              <Users className="w-4 h-4 mr-2" />
              Invite
            </Button>

            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPageMenu(!showPageMenu)}
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>

              {showPageMenu && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button 
                    onClick={handleDuplicate}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </button>
                  <button 
                    onClick={() => alert('Export coming soon!')}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button 
                      onClick={handleDelete}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Editor */}
      <main className="max-w-4xl mx-auto px-6">
        {/* Page Header */}
        <div className="pt-12 pb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="relative">
              <button 
                className="text-6xl hover:bg-gray-100 rounded p-2 transition-colors"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {pageData.emoji}
              </button>
              
              {/* Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="grid grid-cols-5 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          updatePageEmoji(emoji)
                          setShowEmojiPicker(false)
                        }}
                        className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <input
                type="text"
                value={pageData.title}
                onChange={(e) => updatePageTitle(e.target.value)}
                className="text-4xl font-bold text-gray-900 bg-transparent border-none outline-none focus:bg-gray-50 rounded px-2 py-1 w-full"
                placeholder="Untitled"
              />
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="relative">
          <EditorContent editor={editor} />
          
          {/* Block Menu Trigger */}
          <div className="mt-4">
            <button
              onClick={() => setShowBlockMenu(!showBlockMenu)}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded px-2 py-1 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add a block</span>
            </button>
          </div>

          {/* Block Menu */}
          {showBlockMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20"
            >
              <div className="px-3 py-2 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Search for a block type..."
                  className="w-full text-sm border-none outline-none"
                />
              </div>
              <div className="max-h-64 overflow-y-auto">
                {blockTypes.map((block, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center space-x-3"
                    onClick={() => {
                      block.action()
                      setShowBlockMenu(false)
                      editor?.commands.focus()
                    }}
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      <block.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{block.label}</div>
                      <div className="text-xs text-gray-500">{block.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom spacing */}
        <div className="h-32"></div>
      </main>

      {/* Click outside handlers */}
      {showBlockMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowBlockMenu(false)}
        />
      )}
      {showPageMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowPageMenu(false)}
        />
      )}
      {showEmojiPicker && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowEmojiPicker(false)}
        />
      )}
    </div>
  )
}
