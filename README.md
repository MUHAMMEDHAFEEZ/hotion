# Hotion - Enhanced Notion Clone

A powerful, feature-rich Notion clone built with Next.js, TypeScript, and modern web technologies. Experience the next generation of collaborative workspace tools with real-time editing, AI integration, and comprehensive database management.

![Hotion Screenshot](https://via.placeholder.com/800x400?text=Hotion+Screenshot)

## ✨ Features

### 📝 Rich Text Editor
- **Block-based editing** with drag & drop functionality
- **Real-time collaboration** with live cursors and instant updates
- **Rich formatting** including headings, lists, quotes, code blocks, and more
- **Embedded content** support for images, videos, files, and bookmarks
- **Table creation** with advanced formatting options
- **Math expressions** and diagram support (Mermaid)

### 🗄️ Database & Data Management
- **Powerful databases** with custom properties and views
- **Multiple view types**: Table, Kanban, Calendar, Gallery, Timeline
- **Advanced filtering** and sorting capabilities
- **Formulas and rollups** for complex calculations
- **Relations between databases** for connected workflows
- **Import/Export** data in various formats

### 🤝 Collaboration
- **Real-time editing** with conflict resolution
- **Live cursors** showing collaborator presence
- **Comments and mentions** for team communication
- **Advanced permissions** system (Owner, Admin, Member, Guest)
- **Version history** and change tracking
- **Workspace management** for team organization

### 🤖 AI Integration
- **AI-powered writing** assistance and content generation
- **Smart suggestions** for formatting and structure
- **Automated summarization** of long documents
- **Content enhancement** with AI-driven improvements
- **Language translation** support

### 🎨 Modern Interface
- **Beautiful, responsive design** that works on all devices
- **Dark/Light mode** with system preference detection
- **Customizable workspace** with themes and layouts
- **Intuitive navigation** with smart search and shortcuts
- **Mobile-optimized** interface for on-the-go productivity

### 🔒 Security & Performance
- **Enterprise-grade security** with encryption
- **Fast performance** with optimized loading
- **Offline support** for uninterrupted work
- **Regular backups** and data protection
- **SSO integration** support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- SQLite (included) or PostgreSQL/MySQL for production

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hotion.git
   cd hotion
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database
   DATABASE_URL="file:./dev.db"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional: OAuth providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Optional: AI features
   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to see your Hotion workspace!

## 📁 Project Structure

```
hotion/
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── (auth)/          # Authentication pages
│   │   ├── (dashboard)/     # Main app pages
│   │   ├── api/             # API routes
│   │   └── globals.css      # Global styles
│   ├── components/          # Reusable components
│   │   ├── ui/              # Base UI components
│   │   ├── editor/          # Editor components
│   │   ├── database/        # Database components
│   │   └── providers/       # Context providers
│   ├── lib/                 # Utility libraries
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # State management
│   └── types/               # TypeScript definitions
├── prisma/                  # Database schema and migrations
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 🛠️ Technology Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with app directory
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### Editor
- **[TipTap](https://tiptap.dev/)** - Extensible rich-text editor
- **[Y.js](https://github.com/yjs/yjs)** - Real-time collaboration engine
- **[Lowlight](https://github.com/wooorm/lowlight)** - Syntax highlighting

### Backend
- **[Prisma](https://www.prisma.io/)** - Database ORM
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication
- **[SQLite/PostgreSQL](https://www.sqlite.org/)** - Database
- **[Socket.io](https://socket.io/)** - Real-time communication

### State Management
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[React Query](https://tanstack.com/query/)** - Server state management

### AI & Integrations
- **[OpenAI API](https://openai.com/api/)** - AI-powered features
- **[EdgeStore](https://edgestore.dev/)** - File upload and storage

## 🎯 Usage Guide

### Creating Your First Page
1. Click the "New Page" button in the sidebar
2. Choose a template or start blank
3. Add a title and start writing
4. Use `/` to open the block menu for different content types

### Working with Databases
1. Create a new database from the sidebar
2. Define your schema with custom properties
3. Add records and organize your data
4. Switch between different views (Table, Kanban, etc.)

### Collaboration
1. Share your workspace with team members
2. Set appropriate permissions for each user
3. Collaborate in real-time with live editing
4. Use comments and mentions for communication

### AI Features
1. Enable AI features in your environment variables
2. Use the AI assistant for writing help
3. Generate content with AI prompts
4. Enhance your text with AI suggestions

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run prisma:studio` - Open Prisma Studio

### Database Management
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Reset database
npx prisma db reset

# Open Prisma Studio
npx prisma studio
```

### Environment Setup
See `.env.example` for all available environment variables.

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/session` - Get current session

### Pages
- `GET /api/pages` - List pages
- `POST /api/pages` - Create page
- `GET /api/pages/[id]` - Get page
- `PUT /api/pages/[id]` - Update page
- `DELETE /api/pages/[id]` - Delete page

### Databases
- `GET /api/databases` - List databases
- `POST /api/databases` - Create database
- `GET /api/databases/[id]` - Get database
- `PUT /api/databases/[id]` - Update database

### Real-time Events
- `page:update` - Page content changed
- `cursor:move` - User cursor moved
- `user:join` - User joined workspace
- `user:leave` - User left workspace

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Docker
```bash
# Build image
docker build -t hotion .

# Run container
docker run -p 3000:3000 hotion
```

### Manual Deployment
1. Build the application: `npm run build`
2. Set up your database
3. Configure environment variables
4. Start the server: `npm start`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Add documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Notion](https://notion.so) for inspiration
- [TipTap](https://tiptap.dev/) for the excellent editor
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first approach
- All contributors and the open-source community

## 📞 Support

- 📧 Email: support@hotion.dev
- 💬 Discord: [Join our community](https://discord.gg/hotion)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/hotion/issues)
- 📖 Docs: [Full Documentation](https://docs.hotion.dev)

---

**Built with ❤️ by the Hotion team**
