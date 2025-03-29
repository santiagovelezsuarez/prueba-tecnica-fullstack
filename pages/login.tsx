import LoginForm from "@/components/Auth/login-form";
import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <h1 className="text-4xl font-bold">Login Page</h1>
            <p className="mt-4 text-lg">Please log in to access the application.</p>

           <LoginForm />
        </div>
    )
}
