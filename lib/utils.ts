import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchGraphQL = async (query: string, variables: Record<string, any>) => {
  try {
      const res = await fetch('/api/graphql', {
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
