import { fetchGraphQL } from "../utils";


export const addTransaction = async (formData: any) => {
    const cookies = document.cookie;
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
    }, cookies);
};

export const getTransactions = async (cookies?: string, startDate?: string, endDate?: string) => {
    const query = `
        query Transactions($startDate: String, $endDate: String) {
            transactions(startDate: $startDate, endDate: $endDate) {
                id
                amount
                date
                description
                type
                user {
                    id
                    email
                }
            }
        }
    `;

    const variables: Record<string, string | undefined> = {};
    if (startDate) variables.startDate = startDate;
    if (endDate) variables.endDate = endDate;

    return fetchGraphQL(query, variables, cookies);
};