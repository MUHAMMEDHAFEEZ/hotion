'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Search, 
  FileText, 
  Database, 
  Calendar,
  Star,
  Clock,
  Settings,
  LogOut,
  User,
  ChevronDown,
  MoreHorizontal,
  Trash2,
  Edit3,
  Share2,
  Folder,
  Grid3X3,
  List,
  Filter
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
}

interface Page {
  id: string
  title: string
  type: 'page' | 'database' | 'calendar'
  emoji?: string
  lastModified: string
  isFavorite: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'Getting Started',
      type: 'page',
      emoji: '👋',
      lastModified: '2 hours ago',
      isFavorite: true
    },
    {
      id: '2',
      title: 'Project Tasks',
      type: 'database',
      emoji: '📝',
      lastModified: '1 day ago',
      isFavorite: false
    },
    {
      id: '3',
      title: 'Team Calendar',
      type: 'calendar',
      emoji: '📅',
      lastModified: '3 days ago',
      isFavorite: true
    },
    {
      id: '4',
      title: 'Meeting Notes',
      type: 'page',
      emoji: '💼',
      lastModified: '1 week ago',
      isFavorite: false
    }
  ])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('hotion_user')
    if (!savedUser) {
      router.push('/auth/signin')
      return
    }
    setUser(JSON.parse(savedUser))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('hotion_user')
    router.push('/')
  }

  const createNewPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: 'Untitled',
      type: 'page',
      emoji: '📄',
      lastModified: 'just now',
      isFavorite: false
    }
    setPages(prev => [newPage, ...prev])
    router.push(`/editor/${newPage.id}`)
  }

  const toggleFavorite = (pageId: string) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, isFavorite: !page.isFavorite } : page
    ))
  }

  const getTypeIcon = (type: Page['type']) => {
    switch (type) {
      case 'database':
        return <Database className="w-4 h-4" />
      case 'calendar':
        return <Calendar className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const favoritePages = filteredPages.filter(page => page.isFavorite)
  const recentPages = filteredPages.filter(page => !page.isFavorite)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      {/* Header */}
      <header className="bg-background dark:bg-background border-b border-border dark:border-border px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/90 rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Hotion</h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pages..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground bg-input"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 text-foreground hover:text-primary p-2 rounded-lg hover:bg-accent"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-secondary-foreground font-medium text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden sm:block">{user.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg border border-border py-1 z-10">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <div className="border-t border-border mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Good evening, {user.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-muted-foreground">
            Welcome back to your workspace. What would you like to work on today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button onClick={createNewPage} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Page</span>
            </Button>
            <Button variant="outline" onClick={() => alert('Database creation coming soon!')}>
              <Database className="w-4 h-4 mr-2" />
              New Database
            </Button>
            <Button variant="outline" onClick={() => alert('Template gallery coming soon!')}>
              <FileText className="w-4 h-4 mr-2" />
              Templates
            </Button>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-foreground">Your Pages</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Favorites Section */}
        {favoritePages.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4 flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
              Favorites
            </h4>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-2'}>
              {favoritePages.map((page) => (
                <PageCard 
                  key={page.id} 
                  page={page} 
                  viewMode={viewMode}
                  onToggleFavorite={toggleFavorite}
                  onEdit={() => router.push(`/editor/${page.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Pages Section */}
        <div>
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Recent
          </h4>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-2'}>
            {recentPages.map((page) => (
              <PageCard 
                key={page.id} 
                page={page} 
                viewMode={viewMode}
                onToggleFavorite={toggleFavorite}
                onEdit={() => router.push(`/editor/${page.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try a different search term' : 'Create your first page to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={createNewPage}>
                <Plus className="w-4 h-4 mr-2" />
                Create your first page
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

interface PageCardProps {
  page: Page
  viewMode: 'grid' | 'list'
  onToggleFavorite: (id: string) => void
  onEdit: () => void
}

function PageCard({ page, viewMode, onToggleFavorite, onEdit }: PageCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer group">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1" onClick={onEdit}>
            <span className="text-2xl">{page.emoji}</span>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{page.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                {getTypeIcon(page.type)}
                <span className="capitalize">{page.type}</span>
                <span>•</span>
                <span>{page.lastModified}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite(page.id)
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Star className={`w-4 h-4 ${page.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1 hover:bg-gray-100 rounded relative"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group relative"
      onClick={onEdit}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{page.emoji}</span>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(page.id)
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Star className={`w-4 h-4 ${page.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
            {showMenu && (
              <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Rename
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-gray-900 mb-2">{page.title}</h3>
      
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        {getTypeIcon(page.type)}
        <span className="capitalize">{page.type}</span>
        <span>•</span>
        <span>{page.lastModified}</span>
      </div>
    </motion.div>
  )
}

function getTypeIcon(type: Page['type']) {
  switch (type) {
    case 'database':
      return <Database className="w-4 h-4" />
    case 'calendar':
      return <Calendar className="w-4 h-4" />
    default:
      return <FileText className="w-4 h-4" />
  }
}
