// app/page.tsx

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
      <section className="relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />

        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your Links.
            <br />
            <span className="text-primary">One Beautiful Page.</span>
          </h1>

          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg">
            Create a stunning link-in-bio page in seconds.
            Share everything with one simple link.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row">
            <Button size="lg">Create Your Page</Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </section>
  )
}