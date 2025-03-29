import { signIn } from "next-auth/react";

export default function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <h1 className="text-4xl font-bold">Login Page</h1>
            <p className="mt-4 text-lg">Please log in to access the application.</p>

            <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => signIn("github", { redirectTo: "/dashboard/home" })}
            >
                Sign in with GitHub
            </button>
        </div>
    )
}
