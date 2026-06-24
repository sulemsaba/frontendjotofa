import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NewsDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
          {/* Back button skeleton */}
          <div className="h-5 w-40 bg-gray-800 rounded animate-pulse mb-8" />

          <div className="grid md:grid-cols-2fr-1fr gap-10">
            {/* Main content skeleton */}
            <div>
              {/* Category badge */}
              <div className="h-6 w-24 bg-gray-800 rounded-full animate-pulse mb-4" />

              {/* Title */}
              <div className="h-10 bg-gray-800 rounded animate-pulse mb-3" />
              <div className="h-10 w-3/4 bg-gray-800 rounded animate-pulse mb-4" />

              {/* Meta */}
              <div className="h-4 w-64 bg-gray-800 rounded animate-pulse mb-6" />

              {/* Featured image */}
              <div className="w-full aspect-video bg-gray-800 rounded-xl animate-pulse mb-8" />

              {/* Content paragraphs */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>

            {/* Sidebar skeleton */}
            <div>
              {/* Share section */}
              <div className="h-5 w-32 bg-gray-800 rounded animate-pulse mb-4" />
              <div className="flex gap-2 mb-8">
                <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse" />
                <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse" />
              </div>

              {/* Tags */}
              <div className="h-5 w-20 bg-gray-800 rounded animate-pulse mb-4" />
              <div className="flex flex-wrap gap-2 mb-8">
                <div className="h-6 w-20 bg-gray-800 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-gray-800 rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-gray-800 rounded-full animate-pulse" />
              </div>

              {/* Related */}
              <div className="h-5 w-28 bg-gray-800 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-16 w-16 bg-gray-800 rounded animate-pulse flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded animate-pulse mb-2" />
                    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-16 w-16 bg-gray-800 rounded animate-pulse flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded animate-pulse mb-2" />
                    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-16 w-16 bg-gray-800 rounded animate-pulse flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded animate-pulse mb-2" />
                    <div className="h-3 w-20 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="h-32 bg-gray-800 rounded-xl animate-pulse mt-8" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
