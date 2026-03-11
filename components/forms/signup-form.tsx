"use client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signup } from '@/lib/actions'
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
import {redirect} from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    username: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export function SignupForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // console.log(values)
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('username', values.username);
        formData.append('email', values.email);
        formData.append('password', values.password);

        const res = await signup(formData);
        if (!res.success && res.errors) {

            Object.entries(res.errors).forEach(([field, message]) => {
                form.setError(field as never, {
                    type: "server",
                    message: message as string
                })
            })
            toast.error("There is an issue with your request. Please try again.")
            return
        }else {
            form.reset();
            toast.success("Account Created Successfully")
            setTimeout(() => redirect('/login'), 3000)
        }

        // call your API here
        // await fetch("/api/signup", { method:"POST", body: JSON.stringify(values) })
    }
    return (
        <Card className="max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Create you Account</CardTitle>
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

                {/* UserName */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="space-y-4 mb-2">UserName</FormLabel>

                            <FormControl>
                                <Input placeholder="John_Doe" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="space-y-4 mb-2">Name</FormLabel>

                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="space-y-4">Email</FormLabel>

                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="john@email.com"
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
                    className="w-full mt-2"
                >
                    Create Account
                </Button>
            </div>
            </form>
        </Form>
            </CardContent>
        </Card>
    )
}