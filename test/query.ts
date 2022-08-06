// import { GraphQLTestClient } from "./GraphQLTestClient";
// import { AppDataSource } from "../src/data-source/AppDataSource";
// import { TestDataSource } from "./createConnection";

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

// TestDataSource.initialize()
//   .then(() => {
//     GraphQLTestClient(register_mutation, {
//       registerInput: {
//         username: "dude",
//         password: "password",
//         email: "dude@email.com",
//         age: 25,
//       },
//     }).then((result) => {
//       console.log("Result, ", result);
//     });
//   })
//   .catch((err) => console.log(err));
