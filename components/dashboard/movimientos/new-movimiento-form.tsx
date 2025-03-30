import { addTransaction } from '@/lib/actions/movimientos.action';
import clsx from 'clsx';
import { useState } from 'react';

export default function NewMovimientoForm() {
    const [selectedType, setSelectedType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: selectedType,
        date: new Date().toISOString().split('T')[0]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleTypeChange = (type: 'INCOME' | 'EXPENSE') => {
        setSelectedType(type);
        setFormData((prev) => ({ ...prev, type })); // Update formData with the new type
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);
        setSuccessMessage(null);
        
        addTransaction(formData)
        .then((res) => {            
            setSuccessMessage('Movimiento registrado correctamente!');
            setFormData({
                description: '',
                amount: '',
                type: selectedType,
                date:  new Date().toISOString().split('T')[0]
            });
        })
        .catch((error) => {            
            setErrorMessage(error.message || 'Error al registrar el movimiento.');
            setIsSubmitting(false);
            return;
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <div className="flex flex-col gap-4 min-w-96">
            <h2 className="text-xl font-bold">Nuevo movimiento de dinero</h2>
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {/* tipo de movimiento */}
                <div className='m-2'>
                    <label htmlFor="type" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
                        Tipo de movimiento
                    </label>
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md shadow-sm transition-colors duration-200 ${selectedType === 'INCOME'
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            onClick={() => handleTypeChange('INCOME')}
                            aria-pressed={selectedType === 'INCOME'}
                        >
                            Ingreso
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 rounded-md shadow-sm transition-colors duration-200 ${selectedType === 'EXPENSE'
                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            onClick={() => handleTypeChange('EXPENSE')}
                            aria-pressed={selectedType === 'EXPENSE'}
                        >
                            Egreso
                        </button>
                    </div>                    
                </div>
                {/* monto */}
                <div className='m-2'>
                    <label htmlFor="amount" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
                        Monto
                    </label>
                    <input
                        type="number"
                        min={0}                        
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                {/* concepto */}
                <div className='m-2'>
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
                        Concepto
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                {/* fecha */}
                <div className='m-2'>
                    <label htmlFor="date" className="block text-lg font-medium text-gray-700 dark:text-gray-200">
                        Fecha
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                {/* submit */}
                <div className='m-2 mt-4'>
                    <button type="submit" 
                        className={clsx("w-full bg-blue-500 text-white py-2 rounded-md", {
                            'opacity-50 cursor-not-allowed': isSubmitting
                        })}
                        disabled={isSubmitting}
                       >
                        {isSubmitting ? 'Registrando...' : 'Registrar movimiento'}                         
                    </button>
                </div>
            </form>
        </div>
    );
}