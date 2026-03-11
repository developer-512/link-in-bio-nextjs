import Link from "next/link"
import { Button } from "@/components/ui/button"
import {Moon, Sun, Menu, PowerIcon} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {getSessionUser} from "@/lib/actions";
import {signOut} from "@/auth";


export async function Navbar() {
    // const { data: session } = useSession()
    const user =await getSessionUser(); // replace later with auth session
    // console.log(user);
    return (
        <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold">
                    Link<span className="text-primary">Bio</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">

                    <Link href="/pricing">Pricing</Link>

                    {user ? (
                        <>
                            <Link href={"/"+user.username}>{user.username}</Link>

                            <form action={async () => {
                                "use server";
                                await signOut({redirectTo:'/'})
                            }}>
                                <Button>
                                    <PowerIcon className="w-6" />
                                    <div className="hidden md:block">Sign Out</div>
                                </Button>
                            </form>

                        </>
                    ) : (
                        <>
                            {/*<Button variant="ghost" href>Login</Button>*/}
                            <Link href="/login">Login</Link>
                            <Button asChild>
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </>
                    )}

                </nav>

                {/* Mobile menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right">
                        <div className="flex flex-col gap-4 mt-8">
                            <Link href="/pricing">Pricing</Link>
                            <Button>Get Started</Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}