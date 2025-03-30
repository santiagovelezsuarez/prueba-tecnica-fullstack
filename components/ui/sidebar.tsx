import Link from "next/link";
import UserAvatar from "../auth/user-avatar";

export default function Sidebar() {
    return (
        <aside className="w-auto min-w-72 bg-gray-900 text-white p-4">
            <div className="flex justify-center mb-2">
                <img src="/dalle-logo.webp" alt="Logo" className="h-20 rounded-md w-auto" />
            </div>
            <UserAvatar />            
            <nav className="mt-4">
                <ul>
                    <li>
                        <Link href="/dashboard/movimientos">
                            <span className="block p-2 hover:bg-gray-700 rounded">
                                Ingresos y egresos
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/usuarios">
                            <span className="block p-2 hover:bg-gray-700 rounded">
                                Usuarios
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/reportes">
                            <span className="block p-2 hover:bg-gray-700 rounded">
                                Reportes
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}