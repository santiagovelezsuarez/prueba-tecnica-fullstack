import Sidebar from "../ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen max-h-screen">           
            <Sidebar />            
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}