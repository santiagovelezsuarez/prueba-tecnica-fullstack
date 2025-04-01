import { Movimiento } from '@/lib/definitions';
import {
    Table,
    TableBody,    
    TableCell,
    TableFooter,    
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { calculateTotal, formatCurrency, formatDate } from '@/lib/utils';

interface MovimientosListProps {
    movimientos: Movimiento[];
}

export default function MovimientosList({ movimientos }: MovimientosListProps) {
    if (!movimientos || movimientos.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">No hay movimientos registrados.</p>
            </div>
        );
    }
    const total = calculateTotal(movimientos);

    return (
        <Table>
            <TableHeader>
                <TableRow className="">
                    <TableCell className="py-2 px-4 border-b font-bold text-md text-left">Concepto</TableCell>
                    <TableCell className="py-2 px-4 border-b font-bold text-md text-left">Monto</TableCell>
                    <TableCell className="py-2 px-4 border-b font-bold text-md text-left">Fecha</TableCell>
                    <TableCell className="py-2 px-4 border-b font-bold text-md text-left">Usuario</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {movimientos.map((mov, index) => (
                    <TableRow key={index} >
                        <TableCell>
                            {mov.description}
                        </TableCell>
                        <TableCell className={mov.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}>
                            {formatCurrency(mov.amount)}
                        </TableCell>
                        <TableCell>
                            {formatDate(mov.date)}
                        </TableCell>
                        <TableCell>
                            {mov.user.email}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4} className={`text-end font-bold text-lg ${(() => {                        
                        return total > 0 
                            ? 'text-green-700' 
                            : total < 0 
                            ? 'text-red-700' 
                            : 'text-gray-500';
                    })()}`}>
                        <span className='mx-2'>Total:</span>
                        {formatCurrency(total)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}
