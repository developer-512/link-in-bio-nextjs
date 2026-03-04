export function Footer() {
    return (
        <footer className="border-t py-6 mt-10">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} LinkBio. All rights reserved.
            </div>
        </footer>
    )
}