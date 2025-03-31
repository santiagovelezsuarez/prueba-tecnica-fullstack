import Sidebar from "../ui/sidebar";

export default function DashboardLayout({
    children,
    title,
    section
}: {
    children: React.ReactNode;
    title?: string;
    section?: string;
}) {
    return (
        <div className="flex h-screen max-h-screen">
            <Sidebar />
            <main className="flex-1 p-6">
                <div className="flex justify-center mb-5">
                    <h1 className="text-4xl">
                        {title || "Sistema de gestión de ingresos y egresos"}
                    </h1>
                </div>
                <h2 className="text-2xl">
                    {section || "Dashboard"}
                </h2>
                {children}
            </main>
        </div>
    );
}