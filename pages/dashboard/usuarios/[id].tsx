import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { getUser, updateUser } from "@/lib/actions/usuarios.action";
import { User } from "@/lib/definitions";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function EditarUsuario() {
    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");

    const [formData, setFormData] = useState({
        name: "",
        role: "USER",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const fetchUser = async () => {
        try {
            const response = await getUser(id as string);
            setUser(response.user);
            setFormData({
                name: response.user.name,
                role: response.user.role
            });
        } catch (error) {
            console.error("Error al cargar el usuario", error);
            setError("Error al cargar el usuario");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await updateUser(id as string, formData.name, formData.role);
            setUser(response.updateUser);
            setFormData({ name: response.updateUser.name, role: response.updateUser.role });
            router.push("/dashboard/usuarios");
        } catch (error) {
            console.error("Error al actualizar el usuario", error);
            setError("Error al actualizar el usuario");
        } finally {
            setLoading(false);
        }
    };


    return (
        <DashboardLayout section="Usuarios">
            <div className="flex flex-col mt-8">
                <div className="p-10 shadow-md rounded-lg border w-full border-gray-300 mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
                    {loading && <p>Cargando...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {user && (
                        <div className="mb-4">
                            <p className="text-gray-700">Email</p>
                            <p className="text-gray-900 font-semibold">{user.email}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={user?.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" required
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Rol
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                required
                            >
                                <option value="USER">Usuario</option>
                                <option value="ADMIN">Administrador</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            Actualizar
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}