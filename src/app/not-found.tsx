import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-border mb-4">404</div>
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-hover rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-2xl">H</span>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-foreground mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Actions */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Help */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Need help? Try searching for what you're looking for.
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Search pages..."
              className="flex-1 px-4 py-2 border-2 border-border rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary text-foreground bg-background placeholder-muted-foreground transition-all duration-200"
            />
            <Button className="rounded-l-none">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
