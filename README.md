# Community Notes Center

A modern, full-stack note-taking application built with Next.js and Convex. Create, manage, and share notes with support for both public and private content, real-time synchronization, and user authentication.

## ✨ Features

- **Note Management**: Create, read, update, and delete notes with a clean interface
- **Public & Private Notes**: Choose whether your notes are visible to everyone or kept private
- **User Authentication**: Secure email/password authentication powered by Better Auth
- **Real-time Sync**: Instant data synchronization across all clients using Convex
- **Responsive Design**: Beautiful, mobile-friendly UI built with Tailwind CSS
- **Modern Stack**: Built with the latest Next.js 15, React 19, and TypeScript

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15.5.3](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[React Hook Form](https://react-hook-form.com/)** - Form handling and validation

### Backend

- **[Convex](https://www.convex.dev/)** - Serverless backend platform with real-time database
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication library
- **[@convex-dev/better-auth](https://www.npmjs.com/package/@convex-dev/better-auth)** - Convex integration for Better Auth

### Development

- **[Turbopack](https://turbo.build/pack)** - Fast bundler for Next.js
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[Prettier](https://prettier.io/)** - Code formatter

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **pnpm** package manager ([Installation guide](https://pnpm.io/installation))
- **Convex account** - Free tier available at [convex.dev](https://www.convex.dev/)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd note-app
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Convex**

   If you haven't already, install the Convex CLI globally:

   ```bash
   npm install -g convex
   ```

   Then initialize your Convex project:

   ```bash
   npx convex dev
   ```

   This will:
   - Create a new Convex project (or link to an existing one)
   - Generate the necessary environment variables
   - Set up your database schema

4. **Configure environment variables**

   Create a `.env.local` file in the root directory with the following variables (these will be automatically generated when you run `npx convex dev`):

   ```env
   # Deployment used by `npx convex dev`
   CONVEX_DEPLOYMENT=dev:your-deployment-name

   # Convex backend URL
   NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

   # Convex site URL (same as NEXT_PUBLIC_CONVEX_URL but ends in .site)
   NEXT_PUBLIC_CONVEX_SITE_URL=https://your-deployment.convex.site

   # Your local development URL
   SITE_URL=http://localhost:3000
   ```

## 🏃 Running the Application

To run the application locally, you need to start both the Convex backend and the Next.js frontend:

1. **Start the Convex development server** (in one terminal):

   ```bash
   npx convex dev
   ```

   This will watch for changes to your Convex functions and keep your backend in sync.

2. **Start the Next.js development server** (in a separate terminal):

   ```bash
   pnpm dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

The app should now be running with hot-reload enabled for both frontend and backend changes.

## 📁 Project Structure

```
note-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── components/         # React components
│   │   │   ├── EditNoteForm.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NoteForm.tsx
│   │   │   ├── NoteList.tsx
│   │   │   └── SignInForm.tsx
│   │   ├── notes/              # Notes-related pages
│   │   │   ├── [id]/           # Individual note pages
│   │   │   │   ├── edit/       # Edit note page
│   │   │   │   └── page.tsx    # View note page
│   │   │   └── page.tsx        # All notes listing
│   │   ├── api/                # API routes
│   │   │   └── auth/           # Authentication endpoints
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── lib/                    # Utility functions
│   │   ├── auth-client.ts      # Client-side auth config
│   │   ├── auth-server.ts      # Server-side auth config
│   │   └── error-messages.ts   # Error message constants
│   ├── assets/                 # Static assets
│   ├── types.ts                # TypeScript type definitions
│   └── ConvexClientProvider.tsx # Convex client wrapper
├── convex/                     # Convex backend
│   ├── schema.ts               # Database schema
│   ├── notes.ts                # Note-related queries and mutations
│   ├── users.ts                # User-related functions
│   ├── auth.ts                 # Authentication logic
│   ├── auth.config.ts          # Auth configuration
│   ├── http.ts                 # HTTP endpoints
│   └── _generated/             # Auto-generated files (do not edit)
├── .env.local                  # Environment variables (not in git)
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── next.config.ts              # Next.js configuration
```

### Key Directories

- **[`src/app/`](src/app/)** - Contains all Next.js pages and components using the App Router
- **[`convex/`](convex/)** - Backend functions, database schema, and queries/mutations
- **[`src/lib/`](src/lib/)** - Shared utilities and configuration files
- **[`src/app/components/`](src/app/components/)** - Reusable React components

## 📜 Available Scripts

- **`pnpm dev`** - Starts the Next.js development server with Turbopack (runs on port 3000)
- **`pnpm build`** - Creates an optimized production build
- **`pnpm start`** - Starts the production server (requires running `pnpm build` first)
- **`npx convex dev`** - Starts the Convex development server (must run separately)

## 🔐 Authentication

This application uses [Better Auth](https://www.better-auth.com/) integrated with Convex for authentication:

- **Provider**: Email and password authentication
- **Session Management**: Handled by Better Auth with Convex backend storage
- **Protected Routes**: Authentication is required for creating, editing, and deleting notes
- **Public Access**: Anyone can view public notes without authentication

### Authentication Flow

1. Users sign up with email and password
2. Better Auth creates a user session
3. The session is stored in Convex database
4. Protected Convex functions verify the user's identity
5. Users can create private notes (visible only to them) or public notes (visible to everyone)

## 🗄️ Database Schema

The application uses Convex with the following tables:

### Users

- `userId` (string) - Unique user identifier
- `displayName` (string) - User's display name

### Notes

- `title` (string) - Note title
- `content` (string) - Note content
- `isPrivate` (boolean) - Whether the note is private or public
- `updatedTime` (number) - Last update timestamp
- `userId` (reference to users) - Owner of the note

## 💡 Usage

1. **View Public Notes**: Open the homepage to see a list of recent public notes
2. **Sign In**: Click "Sign In" in the header to authenticate
3. **Create Notes**: Once signed in, use the form on the homepage to create new notes
4. **Toggle Privacy**: Check the "Private Note" checkbox to keep notes private
5. **Edit Notes**: Click on "Edit" on any of your notes to modify them
6. **View All Notes**: Click "View All Notes" to see the complete list of notes (public and your private notes)
7. **Delete Notes**: Use the delete button on your own notes to remove them

## 🤝 Contributing

This is a demo project for learning purposes. Feel free to fork and modify it for your own use!

## 📝 License

This project is open source and available for educational purposes.

---

Built with ❤️ using [Next.js](https://nextjs.org/) and [Convex](https://www.convex.dev/)
