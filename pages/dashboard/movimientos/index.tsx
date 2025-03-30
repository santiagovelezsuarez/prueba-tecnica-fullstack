import DashboardLayout from "@/components/dashboard/dashboard-layout";
import MovimientosList from "@/components/dashboard/movimientos/movimientos-list";
import NewMovimientoForm from "@/components/dashboard/movimientos/new-movimiento-form";
import { getTransactions } from "@/lib/actions/movimientos.action";
import { Movimiento } from "@/lib/definitions";
import Link from "next/link";

interface MovimientosListProps {
    movimientos: Movimiento[];
}

export default function Movimientos({ movimientos }: MovimientosListProps) {
    console.log("Movimientos:", movimientos);
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
            <div className="mt-4 flex justify-end">
                <Link href="/dashboard/movimientos/crear" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Nuevo
                </Link>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col mt-8">
                <div className="p-10 shadow-md rounded-lg border w-full border-gray-300 mx-auto">
                    <MovimientosList movimientos={movimientos} />
                    {/* <NewMovimientoForm /> */}
                </div>
            </div>
        </DashboardLayout>
    )
}

export async function getServerSideProps() {
    const data = await getTransactions();

    return {
        props: { movimientos: data.transactions },
    };
}