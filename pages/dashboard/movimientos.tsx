import DashboardLayout from "@/components/dashboard/dashboard-layout";
import NewMovimientoForm from "@/components/dashboard/movimientos/new-movimiento-form";

export default function Movimientos() {
    return (
        <DashboardLayout>
            <div className="flex justify-center mb-5">
                <h1 className="text-4xl">
                    Sistema de gestión de ingresos y egresos
                </h1>
            </div>
            <h2 className="text-2xl">
                Ingresos y egresos
            </h2>
            <hr className="my-2" />
            <div className="flex flex-col mt-8">
                <div className="p-10 shadow-md rounded-lg border border-gray-300 max-w-xl mx-auto">
                    <NewMovimientoForm />
                </div>
            </div>
        </DashboardLayout>
    )
}