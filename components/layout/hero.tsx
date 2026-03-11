import { Button } from "@/components/ui/button"

export function Hero() {
    return (
        <section className="px-4 py-24 text-center">

            <h1 className="text-4xl md:text-6xl font-bold">
                Your Links.
                <br />
                <span className="text-primary">
          One Beautiful Page.
        </span>
            </h1>

            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
                Create your link-in-bio page in seconds and share everything with one link.
            </p>

            <div className="mt-8 flex gap-4 justify-center flex-col sm:flex-row">
                <Button size="lg">Create Your Page</Button>
                <Button size="lg" variant="outline">View Demo</Button>
            </div>

        </section>
    )
}