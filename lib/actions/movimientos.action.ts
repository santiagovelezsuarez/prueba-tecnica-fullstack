import { gql, useMutation } from "@apollo/client";
import { CrearMovimiento } from "../definitions";


export const ADD_TRANSACTION = gql`
        mutation AddTransaction($amount: Float!, $date: String!, $description: String, $type: TransactionType!) {
            addTransaction(amount: $amount, date: $date, description: $description, type: $type) {
                id
                amount
                date
                description
                type            
            }
        }
    `;