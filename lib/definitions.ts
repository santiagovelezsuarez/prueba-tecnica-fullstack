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

export interface Movimiento {
    id: string;
    amount: number;
    date: string;
    description?: string;
    type: 'INCOME' | 'EXPENSE';
    user: User;
}

export interface ReporteMovimientos {
    date: string;
    income: number;
    expense: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    image?: string;
}


