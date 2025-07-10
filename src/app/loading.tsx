export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Logo with loading animation */}
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-hover rounded-xl flex items-center justify-center mx-auto mb-6 animate-pulse">
          <span className="text-primary-foreground font-bold text-2xl">H</span>
        </div>
        
        {/* Loading spinner */}
        <div className="relative">
          <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-muted-foreground text-sm">Loading your workspace...</p>
      </div>
    </div>
  )
}
