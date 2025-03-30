import { fetchGraphQL } from "../utils";

export const addTransaction = async (formData: any) => {
    const { description, amount, type, date } = formData;

    if (!description || !amount || !date) {
        throw new Error("Todos los campos son obligatorios.");
    }

    const query = `
        mutation AddTransaction($amount: Float!, $date: String!, $description: String!, $type: TransactionType!) {
            addTransaction(amount: $amount, date: $date, description: $description, type: $type) {
                id
                amount
                date
                description
                type
            }
        }
    `;

    return fetchGraphQL(query, {
        amount: parseFloat(amount),
        date: new Date(date).toISOString(),
        description,
        type,
    });
};
