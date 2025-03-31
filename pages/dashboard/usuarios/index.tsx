import DashboardLayout from "@/components/dashboard/dashboard-layout";
import UsersList from "@/components/dashboard/usuarios/users-list";
import { getUsers } from "@/lib/actions/usuarios.action";
import { User } from "@/lib/definitions";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";


interface UsersListProps {
    users: User[];
}

export default function UsersPage({ users }: UsersListProps) {
    return (
        <DashboardLayout section="Usuarios">
            <hr className="my-2" />
            <div className="flex flex-col mt-8">
                <div className="p-10 shadow-md rounded-lg border w-full border-gray-300 mx-auto">
                    <div className="overflow-auto max-h-96">
                        <UsersList users={users} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export async function getServerSideProps(context: any) {

    const session = await getServerSession(context.req, context.res, authOptions);
    const isAdmin = session?.user?.role === 'ADMIN';
    if (!isAdmin) {
        return {
            redirect: {
                destination: '/dashboard/unauthorized',
                permanent: false,
            },
        };
    }
    const cookies = context.req.headers.cookie || "";
    const data = await getUsers(cookies);

    return {
        props: { users: data.users },
    };
}

