import NewMovimientoForm from "@/components/dashboard/movimientos/new-movimiento-form";


export default function MovimientosCrear() {
    return (
        <div className="flex flex-col gap-4 min-w-96">
            <h2 className="text-xl font-bold">Nuevo movimiento de dinero</h2>
            <NewMovimientoForm />
        </div>
    );
}