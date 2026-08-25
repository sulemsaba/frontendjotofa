"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-background px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-jotofa-accent mb-4">
            500
          </h1>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We are experiencing technical difficulties. Please try again later or contact us if the problem persists.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-jotofa-accent text-jotofa-navy rounded-full font-semibold text-sm transition-all hover:shadow-lg"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
