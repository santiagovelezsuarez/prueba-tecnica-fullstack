import DashboardLayout from "@/components/dashboard/dashboard-layout";
import NewMovimientoForm from "@/components/dashboard/movimientos/new-movimiento-form";
import Link from "next/link";

export default function MovimientosCrear() {
    return (
        <DashboardLayout section="Ingresos y egresos">           
            <div className="mt-4 flex justify-end">
                <Link href="/dashboard/movimientos" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">                    
                    Movimientos
                </Link>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col mt-8">
                <div className="p-10 shadow-md rounded-lg border max-w-md border-gray-300 mx-auto">
                    <NewMovimientoForm />                  
                </div>
            </div>
        </DashboardLayout>
    );
}