import {LoginForm} from "@/components/forms/login-form";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">

            <div className="w-full max-w-md rounded-xl border p-8 shadow-sm ">
                <LoginForm />
            </div>
        </div>
    )
}