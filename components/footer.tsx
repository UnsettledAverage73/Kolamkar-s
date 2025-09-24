export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 neon-text">Kolam Pattern Analyzer</h3>
          <p className="text-muted-foreground mb-4">Bridging traditional art with modern mathematics</p>
          <div className="flex justify-center gap-6 text-sm text-muted-foreground">
            <a href="/about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="/gallery" className="hover:text-foreground transition-colors">
              Gallery
            </a>
            <a href="/generate" className="hover:text-foreground transition-colors">
              Generate
            </a>
            <a href="/analyze" className="hover:text-foreground transition-colors">
              Analyze
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
