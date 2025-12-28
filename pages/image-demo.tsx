import Image from "next/image";
import Link from "next/link";

export default function ImageOptimizationDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 transition-colors"
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
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Image Optimization Demo
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Compare the standard HTML &lt;img&gt; tag with Next.js &lt;Image&gt;
            component. Open Chrome DevTools to observe the differences in
            loading behavior and Core Web Vitals.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Standard img tag */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-medium rounded-full">
                ❌ Standard &lt;img&gt;
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              HTML img Tag
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              No optimization, causes layout shift (CLS), loads full resolution
            </p>

            <div className="relative bg-black/20 rounded-xl overflow-hidden">
              {/* Using standard img - causes layout shift */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mountain-landscape.png"
                alt="Mountain landscape - standard img"
                className="w-full h-auto"
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-red-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Causes Layout Shift (CLS)
              </div>
              <div className="flex items-center text-red-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                No automatic format conversion
              </div>
              <div className="flex items-center text-red-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Loads full resolution always
              </div>
            </div>
          </div>

          {/* Next.js Image component */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
            <div className="flex items-center mb-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full">
                ✅ Next.js &lt;Image&gt;
              </span>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">
              next/image Component
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Automatic optimization, lazy loading, prevents layout shift
            </p>

            <div className="relative bg-black/20 rounded-xl overflow-hidden">
              {/* Using next/image - optimized */}
              <Image
                src="/mountain-landscape.png"
                alt="Mountain landscape - next/image optimized"
                width={1024}
                height={768}
                className="w-full h-auto"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgIBAwQDAAAAAAAAAAAAAQIDBAAFERIGITFRE0Fh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQADAQEAAAAAAAAAAAAAAAABAgMAEf/aAAwDAQACEEQPwxCc9rrKsmpXZZZDuzt3x7wA/c+se//Z"
                priority
              />
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-green-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Prevents Layout Shift (CLS = 0)
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Auto WebP/AVIF conversion
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Lazy loading by default
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Blur placeholder while loading
              </div>
            </div>
          </div>
        </div>

        {/* Font Optimization Section */}
        <div className="mt-12 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full mr-3">
              ✅ Implemented
            </span>
            Font Optimization with next/font
          </h2>
          <p className="text-gray-400 mb-6">
            This app uses{" "}
            <code className="text-purple-400">next/font/google</code> to load
            Geist and Geist Mono fonts. Check the Network tab - no requests to
            fonts.googleapis.com!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/20 rounded-xl p-6">
              <h3
                className="text-lg font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Geist Sans
              </h3>
              <p
                className="text-gray-300"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                The quick brown fox jumps over the lazy dog. 0123456789
              </p>
            </div>
            <div className="bg-black/20 rounded-xl p-6">
              <h3
                className="text-lg font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Geist Mono
              </h3>
              <p
                className="text-gray-300 font-mono"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                const greeting = &quot;Hello, World!&quot;;
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <h4 className="text-purple-400 font-semibold mb-2">
              Benefits of next/font:
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Self-hosted fonts (no external requests)</li>
              <li>• Zero layout shift with CSS size-adjust</li>
              <li>• Automatic font subsetting</li>
              <li>• Downloaded at build time</li>
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
          <h3 className="text-yellow-400 font-semibold mb-2">
            📋 How to Test:
          </h3>
          <ol className="text-gray-300 text-sm space-y-2">
            <li>1. Open Chrome DevTools (F12)</li>
            <li>2. Go to Network tab and enable &quot;Disable cache&quot;</li>
            <li>3. Refresh the page and observe image loading</li>
            <li>4. Check Performance tab for Cumulative Layout Shift (CLS)</li>
            <li>
              5. Notice: No requests to fonts.googleapis.com in Network tab
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
