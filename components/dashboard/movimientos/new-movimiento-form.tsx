import { useState } from 'react';

export default function NewMovimientoForm() {
    const [selectedType, setSelectedType] = useState<'income' | 'expense'>('income');
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: selectedType,
        date: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { description, amount, type, date } = formData;
        console.log('Form data:', { description, amount, type, date });
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Nuevo movimiento de dinero</h2>
            <form onSubmit={handleSubmit}>
                {/* tipo de movimiento */}
                <div className='m-2'>
                    <label htmlFor="type" className="block text-lg font-medium text-gray-700 mt-4">
                        Tipo de movimiento
                    </label>
                    <div className="mt-1 flex items-center gap-4">
                        <button
                            type="button"
                            className={`px-2 py-1 text-sm rounded-md shadow-sm ${selectedType === 'income'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-500 text-white'
                                }`}
                            onClick={() => setSelectedType('income')}
                        >
                            Ingreso
                        </button>
                        <button
                            type="button"
                            className={`px-2 py-1 text-sm rounded-md shadow-sm ${selectedType === 'expense'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-500 text-white'
                                }`}
                            onClick={() => setSelectedType('expense')}
                        >
                            Egreso
                        </button>
                    </div>
                    <input
                        type="hidden"
                        id="type"
                        name="type"
                        value={selectedType}
                        required
                    />
                </div>
                {/* monto */}
                <div className='m-2'>
                    <label htmlFor="amount" className="block text-lg font-medium text-gray-700">
                        Monto
                    </label>
                    <input
                        type="number"
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
                    <label htmlFor="description" className="block text-lg font-medium text-gray-700">
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
                    <label htmlFor="date" className="block text-lg font-medium text-gray-700">
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
                <div className='m-2'>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                        Registrar movimiento
                    </button>
                </div>
            </form>
        </div>
    );
}