import { redirect } from 'next/navigation'
import { LandingPage } from '@/components/landing-page'

export default function HomePage() {
  // Check if user is authenticated
  // If authenticated, redirect to dashboard
  // For now, show landing page
  
  return <LandingPage />
}
