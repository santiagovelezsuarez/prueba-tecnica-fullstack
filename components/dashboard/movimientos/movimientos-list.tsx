export default function MovimientosList() {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Fecha</th>
                        <th className="py-2 px-4 border-b">Descripción</th>
                        <th className="py-2 px-4 border-b">Monto</th>
                        <th className="py-2 px-4 border-b">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aquí puedes mapear tus datos */}
                </tbody>
            </table>
        </div>
    );
}