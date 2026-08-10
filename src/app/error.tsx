"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      role="alert"
      className="min-h-screen flex items-center justify-center bg-background px-4"
    >
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-jotofa-accent mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Something went wrong
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          We apologize for the inconvenience. Our team has been notified and is
          working to resolve the issue. Please try again or contact us if the
          problem persists.
        </p>
        <button
          onClick={reset}
          aria-label="Try again   reload the page"
          className="px-6 py-2.5 bg-jotofa-accent text-white font-semibold rounded-full hover:bg-jotofa-accent-dark transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jotofa-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
