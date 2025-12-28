import Link from "next/link";
import { categories } from "./data";

export default function KnowledgeBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-72 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6 overflow-y-auto">
          {/* Logo */}
          <div className="mb-8">
            <Link href="/knowledge-base">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                📚 Knowledge Base
              </h2>
            </Link>
            <p className="text-gray-500 text-sm mt-1">
              AI-Powered Documentation
            </p>
          </div>

          {/* Categories */}
          <nav className="space-y-6">
            {categories.map((category) => (
              <div key={category.slug}>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {category.name}
                </h3>
                <Link
                  href={`/knowledge-base/${category.slug}`}
                  className="block px-3 py-2 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-colors text-sm"
                >
                  View {category.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Back to Home */}
          <div className="absolute bottom-6 left-6 right-6">
            <Link
              href="/"
              className="flex items-center justify-center px-4 py-3 text-gray-400 border border-white/10 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-72 flex-1 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
