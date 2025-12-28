import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getDocsByCategory } from "../data";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryData = categories.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  const categoryDocs = getDocsByCategory(category);

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/knowledge-base"
              className="text-gray-400 hover:text-white"
            >
              Knowledge Base
            </Link>
          </li>
          <li className="text-gray-600">/</li>
          <li className="text-blue-400">{categoryData.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {categoryData.name}
        </h1>
        <p className="text-gray-400">{categoryData.description}</p>
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {categoryDocs.map((doc) => (
          <Link
            key={doc.id}
            href={`/knowledge-base/doc/${doc.slug}`}
            className="block bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-500/30 transition-all duration-300 group"
          >
            <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-2">
              {doc.title}
            </h2>
            <p className="text-gray-400 text-sm line-clamp-2">
              {doc.content.substring(0, 150)}...
            </p>
            <div className="mt-4 flex items-center text-blue-400 text-sm">
              Read article
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
        ))}
      </div>
    </div>
  );
}
