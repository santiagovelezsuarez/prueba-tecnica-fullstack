import { User } from "@/lib/definitions";
import {
    Table,
    TableBody,
    TableCell,    
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface UsersListProps {
    users: User[];
}

export default function UsersList({ users }: UsersListProps) {    
    if (!users || users.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">No hay usuarios registrados.</p>
            </div>
        );
    }
    return (
        <Table>
            <TableHeader>
                <TableRow className="">
                    <TableCell className="py-2 px-4 border-b font-bold text-md text-left">Nombre</TableCell>
                    <TableCell className="py-2 px-4 border-b font-bold text-md text-left">Email</TableCell>
                    <TableCell className="py-2 px-4 border-b font-bold text-md text-left">Rol</TableCell>
                    <TableCell className="py-2 px-4 border-b font-bold text-md text-left">...</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user, index) => (
                    <TableRow key={index} >
                        <TableCell>
                            {user.name}
                        </TableCell>
                        <TableCell>
                            {user.email}
                        </TableCell>
                        <TableCell>
                            {user.role}
                        </TableCell>
                        <TableCell>
                            <Link
                                href={`/dashboard/usuarios/${user.id}`}
                                className="text-blue-500 hover:text-blue-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h4m0 0h-4m4 0l-3.5-3.5M15 12l3.5 3.5M12 12h-4m0 0h4m-4 0l3.5-3.5M8 12l-3.5 3.5" />
                                </svg>
                                Editar
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}