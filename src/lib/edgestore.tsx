'use client'

import { createContext, useContext } from 'react'

// Mock EdgeStore provider for now
// In a real implementation, you would use the actual EdgeStore library

interface EdgeStoreContextType {
  upload: (file: File) => Promise<{ url: string }>
  delete: (url: string) => Promise<void>
}

const EdgeStoreContext = createContext<EdgeStoreContextType | undefined>(undefined)

export function EdgeStoreProvider({ children }: { children: React.ReactNode }) {
  const mockUpload = async (file: File): Promise<{ url: string }> => {
    // Mock implementation - in production you'd use actual EdgeStore
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          url: `https://mock-edgestore.dev/${file.name}`,
        })
      }, 1000)
    })
  }

  const mockDelete = async (url: string): Promise<void> => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    })
  }

  const value = {
    upload: mockUpload,
    delete: mockDelete,
  }

  return (
    <EdgeStoreContext.Provider value={value}>
      {children}
    </EdgeStoreContext.Provider>
  )
}

export function useEdgeStore() {
  const context = useContext(EdgeStoreContext)
  if (context === undefined) {
    throw new Error('useEdgeStore must be used within an EdgeStoreProvider')
  }
  return context
}
