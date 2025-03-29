import DashboardLayout from "@/components/dashboard/dashboard-layout";
import NewMovimientoForm from "@/components/dashboard/movimientos/new-movimiento-form";

export default function Movimientos() {
    return (
        <DashboardLayout>
            <div className="flex justify-center mb-10">
                <h1 className="text-4xl">
                    Sistema de gestión de ingresos y egresos
                </h1>
            </div>
            <h2 className="text-2xl">
                Ingresos y egresos
            </h2>
            <hr />
            <div className="flex flex-col gap-4 mt-4">
                <div className="p-8 m-28 shadow-md rounded-lg border border-gray-300 max-w-xl mx-auto">
                    <NewMovimientoForm />
                </div>
            </div>
        </DashboardLayout>
    )
}