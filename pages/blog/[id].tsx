import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import posts from "../../data.json";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface BlogPostProps {
  post: Post | null;
}

export default function BlogPost({ post }: BlogPostProps) {
  const router = useRouter();

  // Fallback loading state
  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-opacity-50 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  // Post not found
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">
            The post you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 transition-colors"
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
          Back to all posts
        </Link>

        {/* Article */}
        <article className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
          {/* Post Number Badge */}
          <div className="flex items-center mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg">
              {post.id}
            </span>
            <span className="ml-4 text-gray-400 text-sm">
              Article #{post.id}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8 leading-tight">
            {post.title}
          </h1>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg">
              {post.content}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-4">
              {["Next.js", "React", "Web Development"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          {parseInt(post.id) > 1 && (
            <Link
              href={`/blog/${parseInt(post.id) - 1}`}
              className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
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
              Previous
            </Link>
          )}
          <div className="flex-grow"></div>
          {parseInt(post.id) < 5 && (
            <Link
              href={`/blog/${parseInt(post.id) + 1}`}
              className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Next
              <svg
                className="w-5 h-5 ml-2"
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
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Generate paths for all 5 posts
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return {
    paths,
    // fallback: true enables on-demand generation for new posts
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({
  params,
}) => {
  const id = params?.id as string;
  const post = posts.find((p) => p.id === id) || null;

  // If post not found in static data, return null (for fallback demonstration)
  if (!post) {
    return {
      props: {
        post: null,
      },
      // Revalidate after 60 seconds to check for new content
      revalidate: 60,
    };
  }

  return {
    props: {
      post,
    },
    // Enable ISR - revalidate every 60 seconds
    revalidate: 60,
  };
};
