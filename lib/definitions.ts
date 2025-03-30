export interface UserCredentials {
    email: string;
    password: string;
}

export interface CrearMovimiento {
    amount: number;
    date: string;
    description?: string;
    type: 'INCOME' | 'EXPENSE';    
}

