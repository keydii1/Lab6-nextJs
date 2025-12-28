// Knowledge Base documentation data
export interface DocSection {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
}

export interface DocCategory {
  name: string;
  slug: string;
  description: string;
}

export const categories: DocCategory[] = [
  {
    name: "Getting Started",
    slug: "getting-started",
    description: "Learn the basics of Next.js and set up your first project",
  },
  {
    name: "Routing",
    slug: "routing",
    description: "Understanding file-based routing in Next.js",
  },
  {
    name: "Data Fetching",
    slug: "data-fetching",
    description: "Server-side rendering, static generation, and more",
  },
  {
    name: "API Routes",
    slug: "api-routes",
    description: "Build your API endpoints with Next.js",
  },
];

export const docs: DocSection[] = [
  {
    id: "1",
    title: "Introduction to Next.js",
    slug: "introduction",
    category: "getting-started",
    content: `Next.js is a powerful React framework that enables you to build production-ready applications with features like server-side rendering (SSR), static site generation (SSG), and API routes out of the box.

## Key Features

- **Hybrid Rendering**: Choose between SSR, SSG, or client-side rendering per page
- **File-based Routing**: Create routes by adding files to the pages directory
- **API Routes**: Build API endpoints as Node.js serverless functions
- **Built-in Optimization**: Automatic image, font, and script optimization
- **Zero Config**: Works out of the box with sensible defaults

## Why Next.js?

Next.js solves many common challenges in React development:
1. SEO optimization through server-side rendering
2. Faster initial page loads
3. Automatic code splitting
4. Built-in CSS and Sass support
5. Fast refresh during development`,
  },
  {
    id: "2",
    title: "Installation and Setup",
    slug: "installation",
    category: "getting-started",
    content: `Setting up a Next.js project is straightforward with create-next-app.

## Quick Start

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Project Structure

After installation, your project will have:
- \`pages/\` - Your application routes
- \`public/\` - Static files like images
- \`styles/\` - CSS files
- \`next.config.js\` - Next.js configuration

## Configuration Options

The \`next.config.js\` file allows you to customize:
- Environment variables
- Custom webpack config
- Redirects and rewrites
- Image optimization settings`,
  },
  {
    id: "3",
    title: "Pages Router",
    slug: "pages-router",
    category: "routing",
    content: `The Pages Router uses the file system for routing. Each file in the pages directory becomes a route.

## Basic Routes

- \`pages/index.js\` → \`/\`
- \`pages/about.js\` → \`/about\`
- \`pages/blog/index.js\` → \`/blog\`

## Dynamic Routes

Use square brackets for dynamic segments:

\`\`\`javascript
// pages/blog/[slug].js
export default function Post({ params }) {
  return <h1>Post: {params.slug}</h1>
}
\`\`\`

## Nested Routes

Create nested folders for nested routes:
- \`pages/blog/[slug]/comments.js\` → \`/blog/:slug/comments\`

## Catch-All Routes

Use \`[...slug].js\` to catch all paths:
- \`pages/docs/[...slug].js\` matches \`/docs/a\`, \`/docs/a/b\`, etc.`,
  },
  {
    id: "4",
    title: "App Router",
    slug: "app-router",
    category: "routing",
    content: `The App Router (Next.js 13+) introduces a new paradigm with React Server Components.

## Key Concepts

- **Server Components**: Components that render on the server by default
- **Client Components**: Use 'use client' directive for interactivity
- **Layouts**: Shared UI that wraps pages
- **Loading States**: Built-in loading UI with loading.js

## File Conventions

- \`page.js\` - Unique UI for a route
- \`layout.js\` - Shared layout for a segment
- \`loading.js\` - Loading UI
- \`error.js\` - Error handling
- \`not-found.js\` - 404 page

## Server vs Client Components

\`\`\`javascript
// Server Component (default)
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component
'use client'
export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\``,
  },
  {
    id: "5",
    title: "getStaticProps",
    slug: "get-static-props",
    category: "data-fetching",
    content: `getStaticProps enables Static Site Generation (SSG) - pages are pre-rendered at build time.

## Basic Usage

\`\`\`javascript
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return {
    props: { posts },
    revalidate: 60, // ISR: regenerate every 60 seconds
  }
}

export default function Blog({ posts }) {
  return posts.map(post => <div key={post.id}>{post.title}</div>)
}
\`\`\`

## When to Use

- Data available at build time
- Content from a headless CMS
- Data that can be publicly cached

## Incremental Static Regeneration

Add \`revalidate\` to update static pages after deployment without rebuilding.`,
  },
  {
    id: "6",
    title: "getServerSideProps",
    slug: "get-server-side-props",
    category: "data-fetching",
    content: `getServerSideProps enables Server-Side Rendering (SSR) - pages are rendered on each request.

## Basic Usage

\`\`\`javascript
export async function getServerSideProps(context) {
  const { params, req, res, query } = context
  
  const data = await fetchUserData(params.id)

  return {
    props: { data },
  }
}

export default function Profile({ data }) {
  return <div>Welcome, {data.name}</div>
}
\`\`\`

## When to Use

- Data that changes frequently
- User-specific content
- Data depending on request (cookies, headers)

## Context Object

The context parameter includes:
- \`params\` - Route parameters
- \`req\` - HTTP request object
- \`res\` - HTTP response object
- \`query\` - Query string parameters`,
  },
  {
    id: "7",
    title: "Creating API Routes",
    slug: "creating-api-routes",
    category: "api-routes",
    content: `API Routes allow you to create API endpoints inside your Next.js application.

## Basic API Route

\`\`\`javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello, World!' })
}
\`\`\`

## HTTP Methods

\`\`\`javascript
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Create data
    res.status(201).json({ created: true })
  } else if (req.method === 'GET') {
    // Get data
    res.status(200).json({ data: [] })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(\`Method \${req.method} Not Allowed\`)
  }
}
\`\`\`

## Dynamic API Routes

\`\`\`javascript
// pages/api/posts/[id].js
export default function handler(req, res) {
  const { id } = req.query
  res.json({ postId: id })
}
\`\`\``,
  },
  {
    id: "8",
    title: "API Middleware",
    slug: "api-middleware",
    category: "api-routes",
    content: `Middleware allows you to run code before a request is completed.

## Creating Middleware

\`\`\`javascript
// middleware.js (root of project)
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check authentication
  const token = request.headers.get('authorization')
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
\`\`\`

## Use Cases

- Authentication and authorization
- Rate limiting
- Logging and analytics
- A/B testing
- Geolocation-based routing

## Edge Runtime

Middleware runs on the Edge Runtime for low latency:
- Runs before cached content
- Can modify request/response headers
- Supports streaming responses`,
  },
];

// Helper function to search docs
export function searchDocs(query: string): DocSection[] {
  const lowercaseQuery = query.toLowerCase();
  return docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowercaseQuery) ||
      doc.content.toLowerCase().includes(lowercaseQuery)
  );
}

// Helper function to get doc by slug
export function getDocBySlug(slug: string): DocSection | undefined {
  return docs.find((doc) => doc.slug === slug);
}

// Helper function to get docs by category
export function getDocsByCategory(categorySlug: string): DocSection[] {
  return docs.filter((doc) => doc.category === categorySlug);
}
