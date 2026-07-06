export default function NewsLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-jotofa-accent/20 border-t-jotofa-gold" />
          <p className="text-muted-foreground text-sm">Loading articles...</p>
        </div>
      </div>
    </div>
  );
}
