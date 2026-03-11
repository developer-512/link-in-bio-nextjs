import { SignupForm } from "@/components/forms/signup-form"

export default function SignupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">

            <div className="w-full max-w-md rounded-xl border p-8 shadow-sm ">

                {/*<h1 className="text-2xl font-bold mb-6">*/}
                {/*    Create your account*/}
                {/*</h1>*/}

                <SignupForm />

            </div>

        </div>
    )
}