#!/bin/bash

# Hotion Setup Script
echo "🚀 Setting up Hotion - Enhanced Notion Clone"
echo "=============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f2 | cut -d '.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Set up environment variables
if [ ! -f .env ]; then
    echo "⚙️  Setting up environment variables..."
    cp .env.example .env
    echo "✅ Environment file created (.env)"
    echo "⚠️  Please edit .env with your configuration"
else
    echo "✅ Environment file already exists"
fi

# Generate Prisma client
echo "🗄️  Setting up database..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

echo "✅ Prisma client generated"

# Push database schema
npx prisma db push

if [ $? -ne 0 ]; then
    echo "❌ Failed to push database schema"
    exit 1
fi

echo "✅ Database schema applied"

# Install Tailwind CSS additional dependencies
echo "🎨 Installing additional UI dependencies..."
npm install tailwindcss-animate @tailwindcss/typography

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Available commands:"
echo "  npm run dev       - Start development server"
echo "  npm run build     - Build for production"
echo "  npm run start     - Start production server"
echo "  npm run lint      - Run linter"
echo "  npx prisma studio - Open database browser"
echo ""
echo "Happy coding! 🚀"
