'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Database, 
  Users, 
  Zap, 
  Shield, 
  Smartphone,
  ArrowRight,
  Star,
  CheckCircle,
  Play
} from 'lucide-react'

export function LandingPage() {
  const [email, setEmail] = useState('')

  const handleGetStarted = () => {
    if (email) {
      alert(`Thanks for your interest! We'll send updates to ${email}`)
    } else {
      alert('Please enter your email address')
    }
  }

  const handleSignIn = () => {
    alert('Sign in functionality coming soon!')
  }

  const handleDemo = () => {
    alert('Demo video coming soon!')
  }

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Rich Text Editor",
      description: "Write with a powerful block-based editor that supports all content types"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Databases & Tables",
      description: "Create powerful databases with custom properties and views"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-time Collaboration",
      description: "Work together in real-time with live cursors and instant updates"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI Integration",
      description: "Boost productivity with AI-powered writing and content generation"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Bank-level security with encryption and advanced permissions"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Ready",
      description: "Access your workspace anywhere with our responsive design"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "Hotion has revolutionized how our team collaborates. The real-time editing is seamless.",
      rating: 5
    },
    {
      name: "Michael Rodriguez", 
      role: "Startup Founder",
      company: "InnovateLab",
      content: "The database features are incredible. We manage our entire business with Hotion.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Designer",
      company: "CreativeStudio",
      content: "Beautiful, intuitive interface. It's everything Notion should be and more.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Hotion</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
          <Button variant="outline" onClick={handleSignIn}>Sign In</Button>
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Your ideas,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}amplified
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The all-in-one workspace that combines docs, databases, and collaboration. 
              Build anything, together.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
          >
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 text-gray-900 bg-white placeholder-gray-500"
              />
              <Button className="rounded-l-none px-6 py-3" onClick={handleGetStarted}>
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center space-x-4 text-sm text-gray-500"
          >
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>Free for personal use</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              <span>No credit card required</span>
            </div>
          </motion.div>
        </div>

        {/* Demo Video/Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 relative"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Button variant="outline" size="lg" className="bg-white/80 backdrop-blur-sm" onClick={handleDemo}>
                <Play className="w-6 h-6 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to work better
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you organize, collaborate, and create like never before.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by teams everywhere
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about Hotion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teams already using Hotion to work better together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button variant="secondary" size="lg" onClick={handleGetStarted}>
              Start for free
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={() => alert('Contact sales coming soon!')}>
              Contact sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold">Hotion</span>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hotion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
