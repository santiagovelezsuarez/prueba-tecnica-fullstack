import type { Session } from "next-auth"
import { SignOut } from "@/components/ui/sign-out";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function Dashboard() {   

    return (
        <DashboardLayout>            
            <p>Welcome to the dashboard!</p>           
        </DashboardLayout>
    );
}

