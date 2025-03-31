export default function UnauthorizedPage() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4">Acceso no autorizado</h2>
                <p className="mb-4">No tienes permiso para acceder a esta página.</p>
                <a href="/dashboard" className="text-blue-500 hover:text-blue-700">Volver al dashboard</a>
            </div>
        </div>
    );
}