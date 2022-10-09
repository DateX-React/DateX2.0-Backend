import { gql } from "apollo-server-express";

export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        age: Int!
        token: String!
    }

    type Message {
        id: ID!
        ownerID: ID!
        contents: String!
        createdAt: String!
    }

    type Conversation {
        id: ID!
        parties: [User!]!
        messages: [Message!]!
    }

    type Query {
        getUser(username: String!): User!
    }

    type Mutation {
        register(registerInput: RegisterUserInput!): User!
        login(username: String!, password: String!): User!
    }

    input RegisterUserInput {
        username: String!
        email: String!
        password: String!
        age: Int!
    }
`;
