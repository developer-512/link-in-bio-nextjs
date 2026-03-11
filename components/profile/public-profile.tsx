import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"

interface PublicProfileProps {
    username?: string
}

export function PublicProfile({username}: PublicProfileProps) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">

            <Card className="w-full max-w-md">
                <CardContent className="p-8 flex flex-col items-center">

                    <Avatar className="h-24 w-24 mb-4">
                        <AvatarFallback>AL</AvatarFallback>
                    </Avatar>

                    <h2 className="text-xl font-semibold">
                        {username}
                    </h2>

                    <p className="text-muted-foreground mb-6">
                        Full Stack Developer
                    </p>

                    <div className="w-full space-y-3">
                        <Button className="w-full">Portfolio</Button>
                        <Button variant="outline" className="w-full">GitHub</Button>
                        <Button variant="outline" className="w-full">Twitter</Button>
                    </div>

                </CardContent>
            </Card>

        </div>
    )
}