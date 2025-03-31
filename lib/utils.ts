import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Movimiento } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatDate(date: string) {  
  const dateObj = new Date(date + 'T12:00:00'); 
  return dateObj.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace('.', '');
}

export function calculateTotal(movimientos: Movimiento[]) {
  return movimientos.reduce((acc, mov) => {
    return mov.type === 'INCOME' ? acc + mov.amount : acc - mov.amount;
  }, 0);
}

export function groupTransactionsByDate(transactions: Movimiento[]) {
  return transactions.reduce((acc: Record<string, { income: number; expense: number }>, transaction) => {
    const { date, type, amount } = transaction;
    
    if (!acc[date]) {
      acc[date] = { income: 0, expense: 0 };
    }

    if (type === 'INCOME') {
      acc[date].income += amount;
    } else {
      acc[date].expense += amount;
    }

    return acc;
  }, {});
}


export const fetchGraphQL = async (query: string, variables: Record<string, any>, cookies?: string) => {
  try {          
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (cookies) {
        headers['Cookie'] = cookies;
      }
      if (!process.env.NEXT_PUBLIC_API_GRAPHQL_URL) {
          throw new Error("API_GRAPHQL_URL is not defined in the environment variables.");
      }
      const res = await fetch(process.env.NEXT_PUBLIC_API_GRAPHQL_URL, {
          method: 'POST',
          headers,
          credentials: "include",          
          body: JSON.stringify({ query, variables })          
      });
      const data = await res.json();     

      if (data.errors) {        
          throw new Error(data.errors[0].message);
      }

      return data.data;
  } catch (error: any) {
      throw new Error(error?.message || "Error en la petición GraphQL.");
  }
};
