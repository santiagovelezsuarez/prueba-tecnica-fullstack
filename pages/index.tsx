import LoginForm from "@/components/Auth/login-form";
import ThemeToggle from "@/components/ui/themeToggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <LoginForm />
      <ThemeToggle />
    </div>
  )
}
