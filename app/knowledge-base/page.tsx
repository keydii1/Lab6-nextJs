import Link from "next/link";
import { categories, docs } from "./data";
import AskAI from "./components/AskAI";

export default function KnowledgeBasePage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
          Next.js Documentation
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Learn Next.js with our comprehensive documentation. Use the AI
          assistant to ask questions and get instant answers based on our
          knowledge base.
        </p>
      </div>

      {/* Ask AI Component - Client Component */}
      <AskAI />

      {/* Categories Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Browse by Category
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const categoryDocs = docs.filter(
              (d) => d.category === category.slug
            );
            return (
              <Link
                key={category.slug}
                href={`/knowledge-base/${category.slug}`}
                className="group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-blue-400 text-sm">
                  <span>{categoryDocs.length} articles</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Articles */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-white mb-6">
          All Documentation
        </h2>
        <div className="space-y-4">
          {docs.map((doc) => (
            <Link
              key={doc.id}
              href={`/knowledge-base/doc/${doc.slug}`}
              className="block bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium hover:text-blue-400 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {doc.content.substring(0, 100)}...
                  </p>
                </div>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                  {doc.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
