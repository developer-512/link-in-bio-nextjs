"use client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {useState} from "react";
import {Loader2} from "lucide-react";
import {authenticate} from "@/lib/actions";

const formSchema = z.object({
    identifier: z.string().min(3, {
        message: 'Username or email is required'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters'
    }),
})
export function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append('identifier', values.identifier)
            formData.append('password', values.password)

            // const res = await signIn("credentials", {
            //     identifier: values.identifier,
            //     password: values.password,
            //     redirect: false, // Prevents automatic redirect to handle errors via toast
            // })
            const res= await authenticate(values.identifier,values.password);

            if (res) {
                toast.error("Invalid username/email or password")
                setIsLoading(false)
            } else {
                toast.success("Welcome back!")
                setTimeout(()=>router.push("/"),3000);
            }

        } catch (error) {
            toast.error("An unexpected error occurred.")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    All your links into one place.
                </CardDescription>
            </CardHeader>
            <CardContent >
                <Form {...form} >
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="bg-background/60 backdrop-blur-xl space-y-6"
                    >

                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username or Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="johndoe or john@example.com"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="space-y-4 mb-2">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid w-full items-center gap-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Authenticating..." : "Sign In"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}