import type { Session } from "next-auth"
import { SignOut } from "@/components/ui/sign-out";
import { useSession } from "next-auth/react";

export default function Dashboard() {

    const { data: session } = useSession();

    console.log("Session data:", session);

    return (
        <div>
            <h1>Protected Home Page</h1>
            <p>This page is protected and can only be accessed by authenticated users.</p>

            <p>
                {"You are logged in as: " + (session?.user?.name || "Guest")}
            </p>
            <img
                src={session?.user?.image ?? "https://i.pravatar.cc/300"}
                alt="User Avatar"
            />
            <p>Welcome to the dashboard!</p>

            <SignOut />
            <p>Click the button above to sign out.</p>
        </div>
    );
}

