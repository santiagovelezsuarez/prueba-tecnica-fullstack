import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function Dashboard() {   

    return (
        <DashboardLayout section="Dashboard">       
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <a href="/dashboard/movimientos" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Movimientos</h5>
                    <p className="font-normal text-gray-700">Gestionar ingresos y egresos</p>
                </a>
                
                <a href="/dashboard/usuarios" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Usuarios</h5>
                    <p className="font-normal text-gray-700">Administrar usuarios del sistema</p>
                </a>
                
                <a href="/dashboard/reportes" className="block p-6 bg-white rounded-lg shadow hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Reportes</h5>
                    <p className="font-normal text-gray-700">Ver reportes y estadísticas</p>
                </a>
            </div>
        </DashboardLayout>
    );
}

