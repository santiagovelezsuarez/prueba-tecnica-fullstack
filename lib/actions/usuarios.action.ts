import { fetchGraphQL } from "../utils";

export const getUsers = async (cookies: string) => {
    const query = `
        query Users {
            users {
                id
                email
                name
                role
            }
        }
    `;

    return fetchGraphQL(query, {}, cookies);
}

export const getUser = async (userId: string) => {
    const query = `
        query User($userId: ID!) {
            user(id: $userId) {
                id
                email
                name
                role
            }
        }
    `;
    const variables = { userId };
    return fetchGraphQL(query, variables);
}

export const updateUser = async (id: string, name: string, role: string) => {    
    const query = `
        mutation UpdateUser($id: ID!, $name: String!, $role: Role!) {
            updateUser(id: $id, name: $name, role: $role) {
                id
                email
                name
                role
            }
        }
    `;
    const variables = { id, name, role };
    return fetchGraphQL(query, variables);
}
