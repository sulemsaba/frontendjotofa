import Link from "next/link";

export default function NewsArticleNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-jotofa-accent mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The article you are looking for does not exist or has been removed.
          Please browse our latest news and insights.
        </p>
        <Link
          href="/news"
          className="inline-block px-6 py-2.5 bg-jotofa-accent text-white font-semibold rounded-full hover:bg-jotofa-accent-dark transition-all"
        >
          Back to News
        </Link>
      </div>
    </div>
  );
}
