'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Plus, 
  Search, 
  Settings, 
  Menu,
  X,
  Star,
  Trash2,
  Share2,
  MoreHorizontal,
  Folder,
  Database,
  Calendar,
  Users,
  Bell,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarItem {
  id: string
  title: string
  icon: React.ReactNode
  href: string
  children?: SidebarItem[]
  isExpanded?: boolean
}

interface Page {
  id: string
  title: string
  icon?: string
  lastModified: Date
  isFavorite: boolean
}

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPage, setSelectedPage] = useState<string | null>(null)

  const sidebarItems: SidebarItem[] = [
    {
      id: 'pages',
      title: 'Pages',
      icon: <FileText className="w-4 h-4" />,
      href: '/pages',
      isExpanded: true,
      children: [
        { id: 'page-1', title: 'Getting Started', icon: <FileText className="w-4 h-4" />, href: '/pages/1' },
        { id: 'page-2', title: 'Project Roadmap', icon: <FileText className="w-4 h-4" />, href: '/pages/2' },
        { id: 'page-3', title: 'Meeting Notes', icon: <FileText className="w-4 h-4" />, href: '/pages/3' },
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: <Database className="w-4 h-4" />,
      href: '/databases',
      children: [
        { id: 'db-1', title: 'Tasks', icon: <Database className="w-4 h-4" />, href: '/databases/1' },
        { id: 'db-2', title: 'Contacts', icon: <Database className="w-4 h-4" />, href: '/databases/2' },
      ]
    },
    {
      id: 'calendar',
      title: 'Calendar',
      icon: <Calendar className="w-4 h-4" />,
      href: '/calendar'
    },
    {
      id: 'shared',
      title: 'Shared with me',
      icon: <Users className="w-4 h-4" />,
      href: '/shared'
    }
  ]

  const recentPages: Page[] = [
    { id: '1', title: 'Getting Started', icon: '📝', lastModified: new Date(), isFavorite: true },
    { id: '2', title: 'Project Roadmap', icon: '🗺️', lastModified: new Date(), isFavorite: false },
    { id: '3', title: 'Meeting Notes', icon: '📋', lastModified: new Date(), isFavorite: true },
    { id: '4', title: 'Design System', icon: '🎨', lastModified: new Date(), isFavorite: false },
  ]

  const SidebarItem = ({ item, level = 0 }: { item: SidebarItem; level?: number }) => {
    const [isExpanded, setIsExpanded] = useState(item.isExpanded || false)

    return (
      <div>
        <div
          className={cn(
            "flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors",
            level > 0 && "ml-4"
          )}
          onClick={() => {
            if (item.children) {
              setIsExpanded(!isExpanded)
            }
          }}
        >
          <div className="flex items-center space-x-2">
            {item.children && (
              <button className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            )}
            {item.icon}
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          {level === 0 && (
            <Button variant="ghost" size="icon" className="w-6 h-6 opacity-0 group-hover:opacity-100">
              <Plus className="w-3 h-3" />
            </Button>
          )}
        </div>
        
        <AnimatePresence>
          {isExpanded && item.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {item.children.map((child) => (
                <SidebarItem key={child.id} item={child} level={level + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 border-r border-orange-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b border-orange-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">H</span>
                  </div>
                  <span className="text-lg font-semibold">Hotion</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Search */}
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-orange-200 dark:border-gray-600 rounded-lg bg-orange-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <div className="space-y-1">
                {sidebarItems.map((item) => (
                  <div key={item.id} className="group">
                    <SidebarItem item={item} />
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-orange-200 dark:border-gray-700">
                <Button className="w-full justify-start" variant="ghost">
                  <Plus className="w-4 h-4 mr-2" />
                  New Page
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Database className="w-4 h-4 mr-2" />
                  New Database
                </Button>
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-orange-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-500">john@example.com</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-orange-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-semibold">Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to your workspace
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Start creating amazing content with our powerful tools
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Page
                </Button>
                <Button variant="outline" size="lg">
                  <Database className="w-4 h-4 mr-2" />
                  Create Database
                </Button>
              </div>
            </div>

            {/* Recent Pages */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Pages</h3>
                <Button variant="ghost" size="sm">
                  View all
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentPages.map((page) => (
                  <motion.div
                    key={page.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-orange-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 transition-colors cursor-pointer"
                    onClick={() => setSelectedPage(page.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{page.icon}</span>
                        <h4 className="font-medium truncate">{page.title}</h4>
                      </div>
                      <div className="flex items-center space-x-1">
                        {page.isFavorite && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                        <Button variant="ghost" size="icon" className="w-6 h-6">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Modified {page.lastModified.toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <FileText className="w-6 h-6" />
                  <span>New Page</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Database className="w-6 h-6" />
                  <span>Database</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Calendar className="w-6 h-6" />
                  <span>Calendar</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <Users className="w-6 h-6" />
                  <span>Collaborate</span>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
