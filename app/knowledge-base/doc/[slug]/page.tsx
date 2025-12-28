import Link from "next/link";
import { notFound } from "next/navigation";
import { docs, getDocBySlug, categories } from "../../data";
import AskAI from "../../components/AskAI";

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const category = categories.find((c) => c.slug === doc.category);

  // Parse content for basic markdown rendering
  const renderContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      // Headers
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-xl font-semibold text-white mt-8 mb-4"
          >
            {paragraph.replace("## ", "")}
          </h2>
        );
      }
      if (paragraph.startsWith("# ")) {
        return (
          <h1 key={index} className="text-2xl font-bold text-white mt-8 mb-4">
            {paragraph.replace("# ", "")}
          </h1>
        );
      }
      // Code blocks
      if (paragraph.startsWith("```")) {
        const lines = paragraph.split("\n");
        const language = lines[0].replace("```", "");
        const code = lines.slice(1, -1).join("\n");
        return (
          <pre
            key={index}
            className="bg-black/40 rounded-xl p-4 overflow-x-auto my-4 border border-white/10"
          >
            <code className="text-sm text-gray-300 font-mono">{code}</code>
          </pre>
        );
      }
      // Lists
      if (paragraph.includes("\n- ") || paragraph.startsWith("- ")) {
        const items = paragraph
          .split("\n")
          .filter((item) => item.startsWith("- "));
        return (
          <ul
            key={index}
            className="list-disc list-inside text-gray-300 space-y-2 my-4"
          >
            {items.map((item, i) => (
              <li key={i}>{item.replace("- ", "")}</li>
            ))}
          </ul>
        );
      }
      // Numbered lists
      if (/^\d+\.\s/.test(paragraph)) {
        const items = paragraph
          .split("\n")
          .filter((item) => /^\d+\.\s/.test(item));
        return (
          <ol
            key={index}
            className="list-decimal list-inside text-gray-300 space-y-2 my-4"
          >
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^\d+\.\s/, "")}</li>
            ))}
          </ol>
        );
      }
      // Regular paragraphs
      return (
        <p key={index} className="text-gray-300 leading-relaxed my-4">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="p-8 max-w-4xl">
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
          <li>
            <Link
              href={`/knowledge-base/${doc.category}`}
              className="text-gray-400 hover:text-white"
            >
              {category?.name}
            </Link>
          </li>
          <li className="text-gray-600">/</li>
          <li className="text-blue-400 truncate max-w-[200px]">{doc.title}</li>
        </ol>
      </nav>

      {/* Article */}
      <article className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <header className="mb-8 pb-6 border-b border-white/10">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
            {category?.name}
          </span>
          <h1 className="text-3xl font-bold text-white mt-4">{doc.title}</h1>
        </header>

        <div className="prose prose-invert max-w-none">
          {renderContent(doc.content)}
        </div>
      </article>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <Link
          href={`/knowledge-base/${doc.category}`}
          className="inline-flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to {category?.name}
        </Link>
      </div>

      {/* Ask AI Widget */}
      <AskAI />
    </div>
  );
}
