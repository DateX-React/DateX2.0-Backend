export const login_mutation = `
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id username email password age token
        }
    }
`;

export const get_user_query = `
    query($username: String!) {
        getUser(username: $username) {
            id email age password username
        }
    }
`;

export const register_mutation = `
    mutation($registerInput: RegisterUserInput!) {
        register(registerInput: $registerInput) {
            id username email password age token
        }
    }
`;
