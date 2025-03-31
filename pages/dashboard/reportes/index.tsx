import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { getTransactions } from "@/lib/actions/movimientos.action";
import { ReporteMovimientos } from "@/lib/definitions";
import { formatCurrency, groupTransactionsByDate } from "@/lib/utils";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

interface MovimientosListProps {
    movimientos: ReporteMovimientos[]
    saldo: number
}

export default function Reportes({ movimientos, saldo }: MovimientosListProps) {       

    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')

    const router = useRouter()

    const handleFilter = () => {
        router.push({
            pathname: router.pathname,
            query: { startDate, endDate },
        });
    };

    const downloadCSV = () => {
        const csvHeader = 'Fecha,Ingresos,Egresos\n';

        const csvContent = movimientos.reduce((acc, row) => {
            return acc + `${row.date},${row.income},${row.expense}\n`;
        }, csvHeader);

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'reporte_movimientos.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <DashboardLayout section="Reportes de ingresos y egresos">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">                    
                    <ResponsiveContainer width="100%" height={380}>
                        <BarChart data={movimientos} className="mx-auto mt-10">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar name={"ingresos"} dataKey="income" fill="#097969" />
                            <Bar name={"egresos"} dataKey="expense" fill="#cb4335" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="justify-center items-center grid">
                    <div className="space-y-4">
                        <p className="text-2xl font-semibold">Filtrar por fechas</p>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                                Fecha inicial
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                                Fecha final
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <button onClick={handleFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            Filtrar
                        </button>
                    </div>
                    <div className="grid justify-start">
                        <div className="flex gap-2">
                            <p className="text-2xl font-semibold mb-4">Saldo</p>
                            <p className={`text-2xl font-bold text-center ${saldo < 0 ? 'text-red-500' : ''}`}>{formatCurrency(saldo)}</p>
                        </div>
                        <button onClick={downloadCSV} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                            Descargar CSV
                        </button>
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
    
    const { startDate, endDate } = context.query;
    const cookies = context.req.headers.cookie || "";
    const data = await getTransactions(cookies, startDate, endDate);

    const groupedData = groupTransactionsByDate(data.transactions);

    const formattedData = Object.entries(groupedData).map(([date, values]: [string, any]) => ({
        date,
        income: values.income,
        expense: values.expense
    }));

    formattedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const saldo = formattedData.reduce((acc, curr) => {
        return acc + curr.income - curr.expense;
    }
        , 0);

    return {
        props: {
            movimientos: formattedData,
            saldo: saldo,
        },
    };
}