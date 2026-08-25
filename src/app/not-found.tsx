import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-jotofa-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Please check the URL or navigate back to our homepage.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-jotofa-accent text-jotofa-navy font-semibold rounded-full hover:bg-jotofa-accent-dark transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
