export const login_mutation = `
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id username email password token
        }
    }
`;

export const register_mutation = `
    mutation($registerInput: RegisterUserInput!) {
        register(registerInput: $registerInput) {
            username email password
        }
    }
`;
