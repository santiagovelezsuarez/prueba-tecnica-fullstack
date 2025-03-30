import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace('.', '');
}

export const fetchGraphQL = async (query: string, variables: Record<string, any>) => {
  try {
      const res = await fetch('http://localhost:3000/api/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables }),
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
