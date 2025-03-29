"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginForm() {
    const [email, setEmail] = useState("admin@mail.co");
    const [password, setPassword] = useState("admin");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Credenciales inválidas");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="w-2/5 mx-auto dark:bg-slate-200 py-6 px-24 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Iniciar Sesión</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                    Iniciar Sesión
                </button>
            </form>
            <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">o inicia sesión con</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="mt-4">
                <button
                    onClick={() => signIn("github", { redirectTo: "/dashboard/" })}
                    className="w-full flex items-center justify-center bg-gray-800 text-white py-2 rounded-md"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.254c-3.338.724-4.042-1.416-4.042-1.416-.547-1.385-1.337-1.756-1.337-1.756-1.092-.746.083-.73.083-.73 1.207.085 1.843 1.24 1.843 1.24 1.07 1.834 2.807 1.304 3.49.997.108-.775.42-1.304.764-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.312.47-2.384 1.24-3.22-.124-.303-.54-1.523.116-3.176 0 0 1.008-.322 3.302 1.23a11.518 11.518 0 013.006-.404c1.02.005 2.044.137 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.66 1.653.244 2.873.12 3.176.774.836 1.24 1.908 1.24 3.22 0 4.61-2.805 5.625-5.476 5.92.432.374.816 1.103.816 2.22v3.293c0 .32.19.692.8.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                        />
                    </svg>
                    GitHub
                </button>                
            </div>
        </div>
    );
}