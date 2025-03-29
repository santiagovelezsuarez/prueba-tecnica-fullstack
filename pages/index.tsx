import LoginForm from "@/components/auth/login-form";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="absolute top-4 left-4">
        <img src="/dalle-logo.webp" alt="Logo" className="h-20 rounded-md w-auto" />
      </div>
      <LoginForm />
    </div>
  )
}
